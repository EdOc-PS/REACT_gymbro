import style from "./popup_logout.module.sass";
import Popup from "reactjs-popup";
import { Post } from "../../../../core/services/post";

export default function PopUpLogout() {
  const handleDelete = async () => {
    const response = await Post(
      `http://localhost:8080/gymbro/auth/logout`, {}
    );

    if (response.success) {
      console.log("Log out efetuado com sucesso!");
    } else {
      console.log(`Erro ao fazer log out: ${response.message}`);
    }
  };

  return (
    <>
      <Popup
        modal
        trigger={
          <button className={style.button}>
            <i className="fi fi-rs-sign-out-alt"></i> Logout{" "}
          </button>
        }
        nested
      >
        <div className={style.modal}>
          <div className={style.header}>Logout</div>
          <div className={style.content}>
            Tem certeza de que deseja finalizar sua sessão?
          </div>
          <div className={style.actions}>
            <button
              onClick={() => {
                close();
              }}
              className={style.cancelButton}
            >
              Cancelar
            </button>
            <button onClick={handleDelete} className={style.deleteButton}>
              Sair
            </button>
          </div>
        </div>
      </Popup>
    </>
  );
}
