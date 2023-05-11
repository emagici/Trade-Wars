import { useWallet } from "@/hooks";
import { useFetchPublicData, useGame } from "@/state/hook";
import { Vault } from "@/types/vault";
import { DuneClient, QueryParameter } from "@cowprotocol/ts-dune-client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ethers } from "ethers";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Web3 from "web3";

const DUNE_API_KEY = "oyZ5C5DTTtVh34HGQ69RKVa6Fwuzwe0P";
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
  const [rows, setRowsData] = useState([]);
  const { provider } = useWallet();
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
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
    const web3 = new Web3(
      "https://arb-goerli.g.alchemy.com/v2/OO-QwEAitxz54pj8eI5jMld-Zg7-GXKj"
    );
    if (gameInfo.data!.length > 0) {
      var sum = ethers.BigNumber.from("0");
      gameInfo.data![gid].teams!.map((item: any, idx: number) => {
        item.map(async (address: string) => {
          const bal = await provider?.getBalance(address);
        });
        rowData.push(createData("Team" + (idx + 1), item.length, "0"));
      });
      // @ts-ignore: Object is possibly 'null'.
      setRowsData(rowData);
    }
    client
      .refresh(queryID)
      .then((executionResult) => console.log(executionResult.result?.rows));
  }, [gameInfo]);
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
                        <div className="w-100 h-100 flex flex-row align-center">
                          <Image
                            src="/assets/icons/user.png"
                            alt="spice"
                            width={32}
                            height={32}
                            style={{ marginRight: "10px" }}
                          />
                          <span className="leading-[32px]">{row["team"]}</span>
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
