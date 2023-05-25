import useRefresh from "@/hooks/useRefresh";
import { useFetchPublicData, useGame } from "@/state/hook";
import { Vault } from "@/types/vault";
import { DuneClient } from "@cowprotocol/ts-dune-client";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount, useContractWrite } from "wagmi";

import TradeWarsJson from "../../utils/abis/TradeWars.json";
import PlayerStatusList from "./PlayerStatusList";

const DUNE_API_KEY = process.env.NEXT_PUBLIC_DUNE_KEY;
const client = new DuneClient(DUNE_API_KEY ?? "");
const queryID = 1168810;

type Props = {
  onClickVault: (vault: Vault, index: number) => void;
};
interface Column {
  id: "team" | "players";
  label: string;
  minWidth?: number;
  align?: "left";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "team", label: "Team", minWidth: 170 },
  {
    id: "players",
    label: "No.\u00a0Of\u00a0Players",
    minWidth: 170,
    // @ts-ignore: Object is possibly 'null'.
    align: "right",
  },
];

interface Data {
  team: string;
  players: number;
}

function createData(team: string, players: number): Data {
  return { team, players };
}

const TeamWaitingList = ({ onClickVault }: Props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentTeamID, setTeamID] = useState(-1);
  const [isTX, setTXStatus] = useState(false);
  const [myTeam, setMyTeam] = useState(-1);
  const [rows, setRowsData] = useState([]);
  const { isConnected, address } = useAccount();
  const [notiText, setNotiText] = useState("");
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const { fastRefresh } = useRefresh();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event: any, reason: any) => {
    setOpen(false);
  };
  const router = useRouter();
  useFetchPublicData();
  const gameInfo = useGame();
  const {
    data: leaveData,
    writeAsync: leaveGame,
    isLoading: leaveLoading,
    isSuccess: leaveSuccess,
    status: leaveStatus,
    error: leaveError,
  } = useContractWrite({
    address: "0xd8b2b4F698C5ce283Cf9c96A7BAC58E19b98f9e1",
    abi: TradeWarsJson,
    functionName: "leaveGame",
  });
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleWithdraw = async () => {
    const gid = Number(router.query.gid);
    if (
      isConnected &&
      !gameInfo.data![gid].teams!.some((row) => row.includes(address!))
    ) {
      setNotiText("You're not a member of this game.");
      handleClickOpen();
    } else {
      try {
        // @ts-ignore: Object is possibly 'null'.
        const result = await leaveGame({ args: [gid] });
        router.push({
          pathname: "/SelectTeam",
          query: {
            gid: gid,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    var rowData: any[] = [];
    const gid = Number(router.query.gid);
    const infuraUrl = process.env.NEXT_PUBLIC_INFURA_URL;

    if (gameInfo.data!.length > 0) {
      gameInfo.data![gid].teams!.map((item: any, idx: number) => {
        item.map((addr: string) => {
          if (
            isConnected &&
            addr.toLocaleLowerCase() === address!.toLowerCase()
          ) {
            setMyTeam(idx);
          }
        });
        rowData.push(createData("Team" + (idx + 1), item.length));
      });
      // @ts-ignore: Object is possibly 'null'.
      setRowsData(rowData);
    }
    // client
    //   .refresh(queryID)
    //   .then((executionResult) => console.log(executionResult.result?.rows));
  }, [gameInfo, fastRefresh]);
  useEffect(() => {
    if (leaveLoading) {
      setTXStatus(true);
      setNotiText("Transaction Loading...");
      setOpen(true);
    }
    if (leaveSuccess || leaveStatus === "error") {
      setTXStatus(false);
      setNotiText("");
      setOpen(false);
    }
  }, [leaveLoading, leaveSuccess, leaveStatus]);
  return (
    <div className="hidden flex items-center md:flex flex-col font-semibold mb-[10px]">
      <div className="flex items-center w-[1156px] border-[12px] border-gap mt-[40px]">
        <TableContainer
          sx={{
            maxHeight: 350,
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
                    style={{ minWidth: column.minWidth, height: "50px" }}
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
                      onClick={() => {
                        // setOpen(true);
                        setTeamID(page * rowsPerPage + idx + 1);
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
                      <TableCell key="players" align="right">
                        {row["players"]}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="flex flex-row item-center mt-[16px]">
        <button
          className={`rounded w-[172px] h-[50px] px-4 py-1 z-50 drop-shadow-join ml-[16px] bg-transparent  bg-btn z-50 drop-shadow-btn`}
          style={{
            borderImage:
              "linear-gradient(180deg, #966E47 0%, rgba(185, 161, 138, 0) 100%) 1",
            borderWidth: "1px",
            borderStyle: "solid",
          }}
          disabled={!isConnected}
          onClick={handleWithdraw}
        >
          <span className="text-base font-Zen text-header text-titleYellow">
            Withdraw
          </span>
        </button>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          backgroundColor: "transparent !important", // gets overridden if not important
          ".MuiDialog-paper": {
            backgroundColor: "rgba(17, 22, 23, 1)",
            borderWidth: "0px",
            width: "670px",
            height: "350px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        <DialogContent className="bg-gap flex flex-col items-center justify-center">
          {isTX && (
            <Image
              src="/assets/icons/loader.gif"
              alt="spice"
              width={150}
              height={150}
            />
          )}
          <DialogContentText
            id="alert-dialog-description"
            style={{
              textShadow:
                "0px 2px 0px rgba(0, 0, 0, 0.2), 0px 0px 2144px #329BFF",
            }}
          >
            <span className="text-btn text-2xl mt-[8px]">{notiText}</span>
          </DialogContentText>
        </DialogContent>
        {!isTX && (
          <DialogActions className="bg-gap">
            {/* @ts-ignore */}
            <Button onClick={handleClose} autoFocus>
              OK
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
};

export default TeamWaitingList;
