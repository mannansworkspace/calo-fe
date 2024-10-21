import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { AppJob } from "../../interfaces";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Props {
  job: AppJob;
  onClose: () => void;
}

export default function JobInfoModal({ job, onClose }: Props) {
  return (
    <div>
      <Modal
        open={!!job}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            JOB = {job.id}
          </Typography>
          {Object.keys(job).map((key) => {
            if (key === "urls") return "";
            return (
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <>
                  {" "}
                  {key} = {job[key as keyof typeof job]}
                </>
              </Typography>
            );
          })}
        </Box>
      </Modal>
    </div>
  );
}
