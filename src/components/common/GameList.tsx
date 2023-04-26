import { Vault } from "@/types/vault";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

import JoinGameBtn from "./JoinGameBtn";

type Props = {
  onClickVault: (vault: Vault, index: number) => void;
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
  wager: number;
  players: number;
  joined: number;
}

function createData(
  game: string,
  status: number,
  duration: string,
  wager: number,
  players: number,
  joined: number
): Data {
  return { game, status, duration, wager, players, joined };
}
const gameStatus = ["Join", "Joined", "Not Joined", "Won", "Lost"];
const rows = [
  createData("Game1", 0, "04 Apr - 11 Apr", 50.25, 5, 0),
  createData("Game2", 1, "04 Apr - 11 Apr", 50.25, 5, 0),
  createData("Game3", 2, "04 Apr - 11 Apr", 50.25, 5, 0),
  createData("Game4", 0, "04 Apr - 11 Apr", 50.25, 5, 0),
  createData("Game5", 1, "04 Apr - 11 Apr", 50.25, 5, 0),
  createData("Game6", 2, "04 Apr - 11 Apr", 50.25, 5, 0),
  createData("Game7", 0, "04 Apr - 11 Apr", 50.25, 5, 0),
  createData("Game8", 0, "04 Apr - 11 Apr", 50.25, 5, 0),
  createData("Game9", 0, "04 Apr - 11 Apr", 50.25, 5, 0),
  createData("Game10", 0, "04 Apr - 11 Apr", 50.25, 5, 0),
  createData("Game11", 0, "04 Apr - 11 Apr", 50.25, 5, 0),
  createData("Game12", 0, "04 Apr - 11 Apr", 50.25, 5, 0),
  createData("Game8", 0, "04 Apr - 11 Apr", 50.25, 5, 0),
  createData("Game9", 0, "04 Apr - 11 Apr", 50.25, 5, 0),
  createData("Game10", 0, "04 Apr - 11 Apr", 50.25, 5, 0),
  createData("Game11", 0, "04 Apr - 11 Apr", 50.25, 5, 0),
  createData("Game12", 0, "04 Apr - 11 Apr", 50.25, 5, 0),
];
const GameList = ({ onClickVault }: Props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const router = useRouter();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
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
                      onClick={() => router.push("/GameStatus")}
                    >
                      <div className="w-100 h-100 flex flex-row align-center">
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
                      onClick={() => router.push("/GameStatus")}
                    >
                      {row["status"] == 0 ? (
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
                      ) : row["status"] == 1 ? (
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
                      ) : (
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
                      )}
                    </TableCell>
                    <TableCell
                      key="duration"
                      align="left"
                      onClick={() => router.push("/GameStatus")}
                    >
                      {row["duration"]}
                    </TableCell>
                    <TableCell
                      key="wager"
                      align="left"
                      onClick={() => router.push("/GameStatus")}
                    >
                      ETH {row["wager"]}
                    </TableCell>
                    <TableCell
                      key="players"
                      align="left"
                      onClick={() => router.push("/GameStatus")}
                    >
                      {row["players"]}
                    </TableCell>
                    <TableCell key="joined" align="right">
                      {row["joined"] == 0 ? (
                        <JoinGameBtn />
                      ) : row["joined"] == 1 ? (
                        "Not Joined"
                      ) : (
                        "Joined"
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
              backgroundColor: "trarnsparent",
              color: "#B9A18A",
            },
          },
        }}
      />
    </div>
  );
};

export default GameList;
