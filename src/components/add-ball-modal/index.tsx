import { Modal, Button, TextField } from "@mui/material";
import { useAddBallModalContext} from "../../context/addBallModalContext";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useBallsContext } from "../../context/ballsContext";
import { createBall } from "../../helpers/generateBall";
import { CreateBall as CreateBallType } from "../../types/types";
import CloseButton from "./CloseButton";

import * as yup from "yup";

import styles from "./styles.module.scss";

const schema = yup.object({
  speed: yup.number().min(0.5).max(10).required().nullable(),
  alpha: yup.number().min(0).max(360).required().nullable(),
  width: yup.number().min(10).max(120).required(),
  color: yup.string().required(),
  word: yup.string().required()
});

const AddBallModal = () => {
  const { isShown, closeModal } = useAddBallModalContext();
  const { addBall } = useBallsContext();

  const {
    control, handleSubmit, reset,
  } = useForm<CreateBallType>({
    defaultValues: {
      speed: 0,
      alpha: 0,
      width: 0,
      color: "",
      word: "",
    },
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<CreateBallType> = (data) => {
    addBall(createBall(data));
    onModalClose();
  };

  const onModalClose = () => {
    closeModal();
    reset();
  };

  return (
    <div>
      <Modal
        className={styles.addBallModal}
        open={isShown}
        onClose={onModalClose}
      >
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <CloseButton
            className={styles.buttonPosition}
            onClick={onModalClose}
          />
          <Controller 
            name="speed"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <TextField label='Speed' {...field} />
            }
          />
          <Controller 
            name="alpha"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <TextField label="Alpha" {...field} />
            }
          />
          <Controller 
            name="width"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <TextField label="Width" {...field} />
            }
          />
          <Controller 
            name="color"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <TextField label="Color" {...field} />
            }
          />
          <Controller 
            name="word"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <TextField label="Word" {...field} />
            }
          />
          <Button type="submit">Submit</Button>
        </form>
      </Modal>
    </div>
  );};

export default AddBallModal;