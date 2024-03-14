/* eslint-disable react/prop-types */
import styles from './ModalCreateActivity.module.sass';

const ModalCreateActivity = (props) => {
    return (
        <div className={styles.modalWrapper}>
            <form
                action="createActivity"
                className={styles.modalWrapper__form}>
                <button
                    className={styles.modalWrapper__form_cls}
                    onClick={() => props.onChangeModal()}>
                    X
                </button>
                <input
                    type="text"
                    placeholder="Enter activity"
                    id="activity"
                    className={styles.modalWrapper__form_input}
                />
                <button className={styles.modalWrapper__form_btn}>Add activity</button>
            </form>
        </div>
    );
};

export default ModalCreateActivity;
