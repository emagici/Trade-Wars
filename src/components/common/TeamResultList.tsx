import useRefresh from "@/hooks/useRefresh";
import { useFetchPublicData, useGame } from "@/state/hook";
import { Vault } from "@/types/vault";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
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
import { useAccount, useContractWrite } from "wagmi";

import TradeWarsJson from "../../utils/abis/TradeWars.json";
import PlayerStatusList from "./PlayerStatusList";

type Props = {
  onClickVault: (vault: Vault, index: number) => void;
};

interface Data {
  team: string;
  players: number;
  wager: number;
}

function createData(team: string, players: number, wager: number): Data {
  return { team, players, wager };
}

const TeamResultList = ({ onClickVault }: Props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentTeamID, setCurrentTeamID] = useState(-1);
  const [winID, setWinID] = useState(0);
  const [rows, setRowsData] = useState([]);
  const [open, setOpen] = useState(false);
  const { isConnected, address } = useAccount();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event: any, reason: any) => {
    if (currentTeamID !== -1) {
      setOpen(false);
    } else if (reason !== "backdropClick" && currentTeamID === -1) {
      setOpen(false);
    }
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const router = useRouter();
  useFetchPublicData();
  const gameInfo = useGame();
  const gameResult = router.query.result;
  const { fastRefresh } = useRefresh();
  const {
    data: claimData,
    writeAsync: claimGame,
    isLoading: claimLoading,
    isSuccess: claimSuccess,
    status: claimStatus,
  } = useContractWrite({
    address: "0xd8b2b4F698C5ce283Cf9c96A7BAC58E19b98f9e1",
    abi: TradeWarsJson,
    functionName: "claim",
  });
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleClaim = async () => {
    if (isConnected) {
      const gid = Number(router.query.gid);
      try {
        const result = await claimGame({
          args: [gid],
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    if (claimLoading) {
      setOpen(true);
    }
    if (claimSuccess || claimStatus === "error") {
      setOpen(false);
    }
  }, [claimLoading, claimSuccess, claimStatus]);
  useEffect(() => {
    var rowData: any[] = [];
    const gid = Number(router.query.gid);
    if (gameInfo.data!.length > 0) {
      gameInfo.data![gid].teams!.map((item: any, idx: number) => {
        rowData.push(createData("Team" + (idx + 1), item.length, 0));
      });
      const wID = Number(gameInfo.games![gid].winningTeam);
      // @ts-ignore: Object is possibly 'null'.
      setRowsData(rowData);
      // @ts-ignore: Object is possibly 'null'.
      setWinID(wID);
    }
  }, [gameInfo, fastRefresh]);
  return (
    <div className="hidden flex items-center md:flex flex-col font-semibold">
      {gameResult === "win" && (
        <button
          className={`w-[197px] h-[50px] px-4 py-1 bg-btn cursor-default z-50 drop-shadow-join mt-[72px]`}
          onClick={handleClaim}
        >
          <span className="text-base font-Zen text-header">CLAIM PRIZE</span>
        </button>
      )}
      <div className="flex items-center w-[600px] border-[12px] border-gap mt-[72px]">
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
              {rows[winID] !== undefined && (
                <TableRow
                  hover
                  tabIndex={-1}
                  key={0}
                  sx={{ maxHeight: "50px" }}
                  onClick={() => {
                    setOpen(true);
                    setCurrentTeamID(winID);
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
                      <span className="leading-[32px]">Team{winID}</span>
                    </div>
                  </TableCell>
                  <TableCell key="status" align="left">
                    ETH {rows[0]["wager"]}
                  </TableCell>
                </TableRow>
              )}
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
                        onClick={() => {
                          setOpen(true);
                          setCurrentTeamID(page * rowsPerPage + idx + 1);
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
                            <span className="leading-[32px]">
                              {row["team"]}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell key="status" align="left">
                          ETH {row["wager"]}
                        </TableCell>
                      </TableRow>
                    )
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
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
            {currentTeamID === -1 && (
              <Image
                src="/assets/icons/loader.gif"
                alt="spice"
                width={150}
                height={150}
              />
            )}

            {currentTeamID === -1 ? (
              <DialogContentText
                id="alert-dialog-description"
                style={{
                  textShadow:
                    "0px 2px 0px rgba(0, 0, 0, 0.2), 0px 0px 44px #329BFF",
                }}
              >
                <span className="text-btn text-2xl mt-[8px]">
                  Transaction Loading...
                </span>
              </DialogContentText>
            ) : (
              <PlayerStatusList teamID={currentTeamID} />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default TeamResultList;
