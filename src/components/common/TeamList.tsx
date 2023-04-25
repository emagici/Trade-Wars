import vaults from "@/constants/vaults";
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
  id: "team" | "players";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "team", label: "Team", minWidth: 170 },
  { id: "players", label: "Players", minWidth: 170 },
];

interface Data {
  team: string;
  players: number;
}

function createData(team: string, players: number): Data {
  return { team, players };
}

const rows = [
  createData("Team1", 10),
  createData("Team2", 11),
  createData("Team3", 12),
  createData("Team4", 13),
  createData("Team5", 11),
  createData("Team6", 1),
  createData("Team7", 13),
  createData("Team8", 15),
  createData("Team9", 1),
  createData("Team10", 10),
];
const TeamList = ({ onClickVault }: Props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [isDeposit, setDepositFlag] = useState(false);
  const router = useRouter();
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleConnect = () => {
    setDepositFlag(true);
  };
  const handleDeposit = () => {
    router.push("/GameStatus");
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <div className="hidden flex items-center justify-center md:flex flex-col font-semibold px-7.5 xl:px-20 pt-[68px] pb-15 xl:py-25">
      <div className="font-Zen text-base text-step w-[600px] ">
        {selectedTeam == "" ? "Select Team" : selectedTeam + " selected"}
      </div>
      <TableContainer
        sx={{
          maxHeight: 600,
          maxWidth: 600,
          marginTop: "14px",
          "& th": {
            color: "#E8E1D4",
            backgroundColor: "#43372C",
            fontFamily: "Zen Dots, sans-serif",
          },
          "& td": {
            color: "#BAA67E",
            fontFamily: "Zen Dots, sans-serif",
            // backgroundColor: "#211C16",
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
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, idx) => {
                return (
                  <TableRow
                    hover
                    tabIndex={idx}
                    key={idx}
                    onClick={() => !isDeposit && setSelectedTeam(row["team"])}
                    style={{
                      backgroundColor:
                        selectedTeam === row["team"] ? "#111617" : "#211C16",
                    }}
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
                    <TableCell key="status" align="right">
                      {row["players"]}
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
        labelRowsPerPage={"Display Rows"}
        labelDisplayedRows={({ page }) => {
          return `Page: ${page + 1} of ${Math.ceil(rows.length / rowsPerPage)}`;
        }}
        sx={{
          backgroundColor: "transparent !important", // gets overridden if not important

          ".MuiInputBase-root": {
            backgroundColor: "transparent",
            borderWidth: "1px",
          },
          ".MuiTablePagination-toolbar": {
            backgroundColor: "transparent",
            color: "#B9A18A",
          },
          ".MuiBox-root": {
            backgroundColor: "yellow",
            color: "#B9A18A",

            "& .MuiSvgIcon-root": {
              backgroundColor: "transparent",
              color: "#B9A18A",
            },
          },
        }}
      />
      {!isDeposit && (
        <button
          className="rounded w-[124px] h-[50px] px-4 py-1 bg-tableHeader z-50 drop-shadow-join  mt-[50px]"
          disabled={selectedTeam == ""}
          onClick={handleConnect}
        >
          <span className="text-[12px] font-Zen text-btnText">Next</span>
        </button>
      )}
      {isDeposit && (
        <div className="flex flex-row item-center mt-[50px]">
          <button
            className="rounded w-[222px] h-[50px] px-4 py-1 bg-btn z-50 drop-shadow-join"
            disabled={selectedTeam == ""}
            onClick={handleDeposit}
          >
            <span className="text-base font-Zen text-header">Enter Wager</span>
          </button>
          <button
            className="rounded w-[172px] h-[50px] px-4 py-1 z-50 drop-shadow-join ml-[16px] bg-btn"
            disabled={selectedTeam == ""}
            onClick={handleConnect}
          >
            <span className="text-base font-Zen text-header">Withdraw</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default TeamList;
