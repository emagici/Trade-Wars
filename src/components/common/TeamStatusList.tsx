import { Vault } from "@/types/vault";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Image from "next/image";
import { useState } from "react";

import JoinGameBtn from "./JoinGameBtn";

type Props = {
  onClickVault: (vault: Vault, index: number) => void;
};
interface Column {
  id: "team" | "wager" | "players";
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
    id: "wager",
    label: "Total\u00a0Wagered",
    minWidth: 170,
    format: (value: number) => value.toLocaleString("en-US"),
  },
];

interface Data {
  team: string;
  wager: number;
  players: number;
}

function createData(team: string, wager: number, players: number): Data {
  return { team, wager, players };
}

const rows = [
  createData("Game1", 50.25, 1),
  createData("Game2", 51.25, 3),
  createData("Game3", 52.25, 5),
  createData("Game4", 53.25, 3),
  createData("Game5", 50.25, 4),
  createData("Game6", 50.25, 5),
  createData("Game7", 54.25, 6),
  createData("Game9", 55.25, 7),
];
const TeamStatusList = ({ onClickVault }: Props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
                        ETH {row["wager"]}
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
