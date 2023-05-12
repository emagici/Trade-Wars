import { useWallet } from "@/hooks";
import { useGame } from "@/state/hook";
import { useFetchPublicData } from "@/state/hook";
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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

import TradeWarsJson from "../../utils/abis/TradeWars.json";

type Props = {
  onClickVault: (idx: number) => void;
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

const TeamList = ({ onClickVault }: Props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedID, setSelectedID] = useState(-1);
  const [notiText, setNotiText] = useState("");
  const { signer, account } = useWallet();

  const [isDeposited, setDeposit] = useState(false);
  const [rows, setRowsData] = useState([]);
  const router = useRouter();
  useFetchPublicData();
  const gameInfo = useGame();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleDeposit = async () => {
    const tradeContract = new ethers.Contract(
      "0xd8b2b4F698C5ce283Cf9c96A7BAC58E19b98f9e1",
      TradeWarsJson,
      signer
    );
    const gid = Number(router.query.gid);
    const wage = gameInfo.data![gid].wage;
    if (
      account !== undefined &&
      gameInfo.data![gid].teams!.some((row) => row.includes(account!))
    ) {
      setNotiText("You have already joined to this game.");
      handleClickOpen();
    } else if (
      account !== undefined &&
      !gameInfo.data![gid].teams!.some((row) => row.includes(account!))
    ) {
      const provider = ethers.getDefaultProvider();
      const balance = await provider.getBalance(account);
      if (balance.lt(wage!)) {
        setNotiText("You don't have enough fund to join.");
        handleClickOpen();
      }
    } else {
      const result = await tradeContract.joinGame(gid, selectedID, {
        value: wage,
      });
      setDeposit(true);
    }
  };
  const handleWithdraw = async () => {
    const tradeContract = new ethers.Contract(
      "0xd8b2b4F698C5ce283Cf9c96A7BAC58E19b98f9e1",
      TradeWarsJson,
      signer
    );
    const gid = Number(router.query.gid);
    const wage = gameInfo.data![gid].wage;
    if (
      account !== undefined &&
      !gameInfo.data![gid].teams!.some((row) => row.includes(account!))
    ) {
      setNotiText("You're not a member of this game.");
      handleClickOpen();
    } else {
      const result = await tradeContract.leaveGame(gid);
    }
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    var rowData: any[] = [];
    const gid = Number(router.query.gid);
    if (gameInfo.data!.length > 0) {
      gameInfo.data![gid].teams!.map((item: any, idx: number) => {
        rowData.push(createData("Team" + (idx + 1), item.length));
      });
      // @ts-ignore: Object is possibly 'null'.
      setRowsData(rowData);
    }
  }, [gameInfo]);
  return (
    <div className="hidden flex items-center justify-center md:flex flex-col font-semibold px-7.5 xl:px-20 pb-15">
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
            cursor: "",
            // backgroundColor: "#211C16",
          },
          "& td:hover": {
            cursor: "pointer",
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
                    onClick={() => {
                      if (account !== undefined) {
                        setSelectedTeam(row["team"]);
                      }
                      onClickVault(page * rowsPerPage + idx + 1),
                        setSelectedID(page * rowsPerPage + idx + 1);
                    }}
                    style={{
                      backgroundColor:
                        selectedID === page * rowsPerPage + idx + 1
                          ? "#111617"
                          : "#211C16",
                    }}
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
        // rowsPerPageOptions={[3, 5, 10]}
        component="div"
        count={rows.length}
        rowsPerPage={8}
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
            backgroundColor: "yellow",
            color: "#B9A18A",
            display: "hidden",

            "& .MuiSvgIcon-root": {
              backgroundColor: "transparent",
              color: "#B9A18A",
            },
          },
        }}
      />
      <div className="flex flex-row item-center mt-[50px]">
        <button
          className={`rounded w-[222px] h-[50px] px-4 py-1 ${
            account === undefined || selectedTeam === ""
              ? "bg-disable"
              : "bg-btn"
          } ${
            account === undefined || selectedTeam === ""
              ? "cursor-not-allowed	"
              : "cursor-default	"
          } bg-btn z-50 drop-shadow-join`}
          disabled={selectedTeam == ""}
          onClick={handleDeposit}
        >
          <span className="text-base font-Zen text-header">Enter Wager</span>
        </button>
        <button
          className={`rounded w-[172px] h-[50px] px-4 py-1 z-50 drop-shadow-join ml-[16px] ${
            account === undefined || selectedTeam === ""
              ? "bg-disable"
              : "bg-btn"
          } ${
            account === undefined || selectedTeam === ""
              ? "cursor-not-allowed	"
              : "cursor-default	"
          } bg-btn z-50 drop-shadow-join`}
          disabled={selectedTeam == ""}
          onClick={handleWithdraw}
        >
          <span className="text-base font-Zen text-header">Withdraw</span>
        </button>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Error"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {notiText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TeamList;
