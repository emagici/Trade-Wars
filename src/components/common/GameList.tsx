import useRefresh from "@/hooks/useRefresh";
import { useFetchPublicData, useGame } from "@/state/hook";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { ethers } from "ethers";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import JoinGameBtn from "./JoinGameBtn";

type Props = {
  onClickVault: (_: any, index: number) => void;
};
interface Column {
  id: "game" | "status" | "duration" | "wager" | "players" | "joined";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "game", label: "Game", minWidth: 170 },
  { id: "status", label: "Status", minWidth: 170 },
  {
    id: "duration",
    label: "Duration",
    minWidth: 170,
  },
  {
    id: "wager",
    label: "Wager\u00a0Amount",
    minWidth: 170,
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "players",
    label: "Players",
    minWidth: 170,
  },
  {
    id: "joined",
    label: "Joined",
    minWidth: 170,
    align: "right",
  },
];

interface Data {
  game: string;
  status: number;
  duration: string;
  wager: string;
  players: number;
  joined: number;
}

function createData(
  game: string,
  status: number,
  duration: string,
  wager: string,
  players: number,
  joined: number
): Data {
  return { game, status, duration, wager, players, joined };
}
const GameList = ({ onClickVault }: Props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [rows, setRowsData] = useState([]);
  const router = useRouter();
  useFetchPublicData();
  const gameInfo = useGame();
  const { isConnected, address } = useAccount();
  console.log("wagmi", isConnected, address);
  const { fastRefresh } = useRefresh();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handlePage = (status: number, idx: number) => {
    if (status === 1) {
      router.push({
        pathname: "/SelectTeam",
        query: {
          gid: idx,
        },
      });
    } else if (status === 2) {
      router.push({
        pathname: "/GameStatus",
        query: {
          gid: idx,
        },
      });
    } else if (status === 4 && isConnected) {
      if (
        gameInfo.games !== undefined &&
        gameInfo.data !== undefined &&
        gameInfo.data[idx].teams !== undefined
      ) {
        const winID = gameInfo.games![idx].winningTeam;
        const result = gameInfo.data[idx].teams![winID! - 1].some((row) =>
          row.includes(address!)
        );
        router.push({
          pathname: "/GameResult",
          query: {
            result: result ? "win" : "lose",
            gid: idx,
          },
        });
      }
    }
  };
  const handleUserStatus = (status: number, idx: number) => {
    if (
      status === 1 &&
      !gameInfo.data![idx].teams!.some((row) => row.includes(address!))
    ) {
      return 0;
    } else if (
      status === 1 &&
      gameInfo.data![idx].teams!.some((row) => row.includes(address!))
    ) {
      return 1;
    } else if (status === 2) {
      if (gameInfo.data![idx].teams!.some((row) => row.includes(address!))) {
        return 1;
      } else return 2;
    } else if (status === 4) {
      if (gameInfo.data![idx].teams!.some((row) => row.includes(address!))) {
        const winID = gameInfo.games![idx].winningTeam;
        if (
          gameInfo.data![idx].teams![winID! - 1].some((row) =>
            row.includes(address!)
          )
        ) {
          return 3;
        } else return 4;
      } else return 2;
    } else return 5;
  };
  useEffect(() => {
    var rowData: Data[] = [];
    if (gameInfo.data!.length > 0) {
      gameInfo.data!.map((item: any, idx: number) => {
        const wager = item.wage.toString();
        const ethValue = ethers.utils.formatEther(wager);

        var totalPlayer = 0;
        item.teams.map((team: any) => {
          totalPlayer += team.length;
        });
        rowData.push(
          createData(
            "Game" + (idx + 1),
            item.status,
            "04 Apr - 11 Apr",
            ethValue,
            totalPlayer,
            0
          )
        );
      });
      if (rowData.length > 0) {
        // @ts-ignore: Object is possibly 'null'.
        setRowsData(rowData);
      }
    }
  }, [gameInfo, fastRefresh]);
  return (
    <div className="hidden flex items-center md:flex flex-col font-semibold mt-10">
      <TableContainer
        sx={{
          maxWidth: 1080,
          maxHeight: 600,
          "& th": {
            color: "#E8E1D4",
            backgroundColor: "#43372C",
            fontFamily: "Zen Dots, sans-serif",
          },
          "& td": {
            color: "#BAA67E",
            fontFamily: "Zen Dots, sans-serif",
            backgroundColor: "#211C16",
            cursor: "pointer",
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
                  <TableRow hover tabIndex={-1} key={idx}>
                    <TableCell
                      key="game"
                      align="left"
                      onClick={() =>
                        handlePage(row["status"], page * rowsPerPage + idx)
                      }
                    >
                      <div className="w-100 h-100 flex flex-row items-center">
                        <Image
                          src="/assets/icons/user.png"
                          alt="spice"
                          width={32}
                          height={32}
                          style={{ marginRight: "10px" }}
                        />
                        <span className="leading-[32px]">{row["game"]}</span>
                      </div>
                    </TableCell>
                    <TableCell
                      key="status"
                      align="left"
                      onClick={() =>
                        handlePage(row["status"], page * rowsPerPage + idx)
                      }
                    >
                      {row["status"] == 1 ? (
                        <div className="flex flex-row items-center">
                          <Image
                            src="/assets/icons/p1.png"
                            width={10}
                            height={10}
                            className="mr-[4px]"
                            alt="p1"
                          />
                          Pre-Start
                        </div>
                      ) : row["status"] == 2 ? (
                        <div className="flex flex-row items-center text-stepTitle">
                          <Image
                            src="/assets/icons/p2.png"
                            width={10}
                            height={10}
                            className="mr-[4px]"
                            alt="p2"
                          />
                          In-progress
                        </div>
                      ) : row["status"] == 4 ? (
                        <div className="flex flex-row items-center text-completed">
                          <Image
                            src="/assets/icons/p3.png"
                            width={10}
                            height={10}
                            className="mr-[4px]"
                            alt="p3"
                          />
                          Completed
                        </div>
                      ) : (
                        <div className="flex flex-row items-center text-completed">
                          <Image
                            src="/assets/icons/p3.png"
                            width={10}
                            height={10}
                            className="mr-[4px]"
                            alt="p3"
                          />
                          Cancelled
                        </div>
                      )}
                    </TableCell>
                    <TableCell
                      key="duration"
                      align="left"
                      onClick={() =>
                        handlePage(row["status"], page * rowsPerPage + idx)
                      }
                    >
                      {row["duration"]}
                    </TableCell>
                    <TableCell
                      key="wager"
                      align="left"
                      onClick={() =>
                        handlePage(row["status"], page * rowsPerPage + idx)
                      }
                    >
                      ETH {row["wager"]}
                    </TableCell>
                    <TableCell
                      key="players"
                      align="left"
                      onClick={() =>
                        handlePage(row["status"], page * rowsPerPage + idx)
                      }
                    >
                      {row["players"]}
                    </TableCell>
                    <TableCell key="joined" align="right">
                      {handleUserStatus(
                        row["status"],
                        page * rowsPerPage + idx
                      ) == 0 ? (
                        <JoinGameBtn gameID={page * rowsPerPage + idx} />
                      ) : handleUserStatus(
                          row["status"],
                          page * rowsPerPage + idx
                        ) == 1 ? (
                        <span className="text-joined">Joined</span>
                      ) : handleUserStatus(
                          row["status"],
                          page * rowsPerPage + idx
                        ) == 2 ? (
                        <span className="text-btn">Not Joined</span>
                      ) : handleUserStatus(
                          row["status"],
                          page * rowsPerPage + idx
                        ) == 3 ? (
                        <span className="text-lose">Won</span>
                      ) : handleUserStatus(
                          row["status"],
                          page * rowsPerPage + idx
                        ) == 4 ? (
                        <span className="text-btn">Lost</span>
                      ) : (
                        <span className="text-btn">Cancelled</span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[3, 5, 10]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={""}
        labelDisplayedRows={({ page }) => {
          return `Page: ${page + 1} of ${Math.ceil(rows.length / rowsPerPage)}`;
        }}
        sx={{
          backgroundColor: "transparent !important", // gets overridden if not important
          ".MuiInputBase-root": {
            backgroundColor: "transparent",
            borderWidth: "0px",
            display: "none",
          },
          ".MuiTablePagination-toolbar": {
            backgroundColor: "transparent",
            color: "#B9A18A",
          },
          ".MuiBox-root": {
            backgroundColor: "red",
            color: "#B9A18A",

            "& .MuiSvgIcon-root": {
              backgroundColor: "transparent",
              color: "#B9A18A",
            },
          },
        }}
      />
    </div>
  );
};

export default GameList;
