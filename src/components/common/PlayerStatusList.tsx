import { useWallet } from "@/hooks";
import useRefresh from "@/hooks/useRefresh";
import { useFetchPublicData, useGame } from "@/state/hook";
import { Vault } from "@/types/vault";
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

import TradeWarsJson from "../../utils/abis/TradeWars.json";

type Props = {
  teamID: number;
};
interface Column {
  id: "team" | "wager";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

interface Data {
  team: string;
  wager: number;
}

function createData(team: string, wager: number): Data {
  return { team, wager };
}

const PlayerStatusList = ({ teamID }: Props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [winID, setWinID] = useState(0);
  const [rows, setRowsData] = useState([]);
  const { provider, signer } = useWallet();
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const router = useRouter();
  useFetchPublicData();
  const gameInfo = useGame();
  const gameResult = router.query.result;
  const { fastRefresh } = useRefresh();

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
    const web3 = new Web3(infuraUrl!);
    if (gameInfo.data!.length > 0) {
      var sum = ethers.BigNumber.from("0");
      gameInfo.data![gid].teams![teamID - 1].map((item: any, idx: number) => {
        rowData.push(createData("Player" + (idx + 1), 0));
      });
      const wID = Number(gameInfo.games![gid].winningTeam);
      // @ts-ignore: Object is possibly 'null'.
      setRowsData(rowData);
    }
  }, [gameInfo, fastRefresh]);
  return (
    <div className="hidden flex items-center md:flex flex-col font-semibold">
      <div className="flex items-center w-[600px] border-[12px] border-gap">
        <TableContainer
          sx={{
            maxHeight: 400,
            maxWidth: 1156,
            "& th": {
              color: "#E8E1D4",
              backgroundColor: "rgba(17, 22, 23, 1)",
              fontFamily: "Zen Dots, sans-serif",
              fontSize: "24px",
              paddingX: "0px",
              textAlign: "right",
            },
            "& td": {
              color: "#BAA67E",
              fontFamily: "Zen Dots, sans-serif",
              backgroundColor: "#211C16",
              textAlign: "right",
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
              <TableRow hover tabIndex={-1} key={0} sx={{ maxHeight: "50px" }}>
                <TableCell key="game" align="left">
                  <div className="w-100 h-100 flex flex-row items-center text-step">
                    <span className="leading-[32px]">Players</span>
                  </div>
                </TableCell>
                <TableCell key="status" align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, idx) => {
                  return (
                    page * rowsPerPage + idx + 1 !== winID && (
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
                            <span className="leading-[32px]">
                              {row["team"]}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell key="status" align="left">
                          $ {row["wager"]}
                        </TableCell>
                      </TableRow>
                    )
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default PlayerStatusList;
