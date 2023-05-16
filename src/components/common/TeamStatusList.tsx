import { useWallet } from "@/hooks";
import useRefresh from "@/hooks/useRefresh";
import { useFetchPublicData, useGame } from "@/state/hook";
import { Vault } from "@/types/vault";
import { DuneClient } from "@cowprotocol/ts-dune-client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DUNE_API_KEY = process.env.NEXT_PUBLIC_DUNE_KEY;
const client = new DuneClient(DUNE_API_KEY ?? "");
const queryID = 1168810;

type Props = {
  onClickVault: (vault: Vault, index: number) => void;
};
interface Column {
  id: "team" | "pnl" | "players";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "team", label: "Team", minWidth: 170 },
  {
    id: "players",
    label: "No.\u00a0Of\u00a0Players",
    minWidth: 170,
  },
  {
    id: "pnl",
    label: "PNL",
    minWidth: 170,
    format: (value: number) => value.toLocaleString("en-US"),
  },
];

interface Data {
  team: string;
  players: number;
  wager: string;
}

function createData(team: string, players: number, wager: string): Data {
  return { team, players, wager };
}

const TeamStatusList = ({ onClickVault }: Props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [myTeam, setMyTeam] = useState(-1);
  const [rows, setRowsData] = useState([]);
  const { provider, account } = useWallet();
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const { fastRefresh } = useRefresh();

  const router = useRouter();
  useFetchPublicData();
  const gameInfo = useGame();

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    var rowData: any[] = [];
    const gid = Number(router.query.gid);
    const infuraUrl = process.env.NEXT_PUBLIC_INFURA_URL;

    if (gameInfo.data!.length > 0) {
      gameInfo.data![gid].teams!.map((item: any, idx: number) => {
        item.map((address: string) => {
          if (
            account !== undefined &&
            address.toLocaleLowerCase() === account!.toLowerCase()
          ) {
            setMyTeam(idx);
          }
        });
        rowData.push(createData("Team" + (idx + 1), item.length, "0"));
      });
      // @ts-ignore: Object is possibly 'null'.
      setRowsData(rowData);
    }
    client
      .refresh(queryID)
      .then((executionResult) => console.log(executionResult.result?.rows));
  }, [gameInfo, account, fastRefresh]);
  return (
    <div className="hidden flex items-center md:flex flex-col font-semibold">
      <div className="flex items-center w-[1156px] border-[12px] border-gap mt-[72px]">
        <TableContainer
          sx={{
            maxHeight: 400,
            maxWidth: 1156,
            "& th": {
              color: "#E8E1D4",
              backgroundColor: "#43372C",
              fontFamily: "Zen Dots, sans-serif",
            },
            "& td": {
              color: "#BAA67E",
              fontFamily: "Zen Dots, sans-serif",
              backgroundColor: "#211C16",
            },
          }}
        >
          <Table
            aria-label="sticky table"
            sx={{
              [`& .${tableCellClasses.root}`]: {
                borderBottomColor: "rgba(95, 89, 89, 0.54)",
              },
            }}
          >
            <TableHead className="bg-tableHeader text-sm font-Zen font-tableColor">
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, idx) => {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={idx}
                      sx={{ maxHeight: "50px" }}
                    >
                      <TableCell key="game" align="left">
                        <div className="w-100 h-100 flex flex-row items-center">
                          <Image
                            src="/assets/icons/user.png"
                            alt="spice"
                            width={32}
                            height={32}
                            style={{ marginRight: "10px" }}
                          />
                          <span className="leading-[32px] mr-[8px]">
                            {row["team"]}
                          </span>
                          {myTeam === page * rowsPerPage + idx && (
                            <div className="w-[68px] h-[15px] border-[1px] border-lose rounded-[2px] flex items-center justify-center">
                              <span className="font-Poppins h-[15px] text-lose text-[10px]">
                                Your team
                              </span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell key="players" align="left">
                        {row["players"]}
                      </TableCell>
                      <TableCell key="status" align="left">
                        $ {row["wager"]}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default TeamStatusList;
