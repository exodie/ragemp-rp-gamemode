import { FC } from "react";
import { Banknote, Wallet } from "lucide-react";

import { regExp } from "utils/Helpers.util";

import styles from "../mainhud.module.scss";

type Props = {
    cash: number;
    wallet: number;
};

export const MoneyOutput: FC<Props> = ({ cash, wallet }) => {
    return (
        <div className={styles.money}>
            <div className={styles.info}>
                <Banknote width={28} height={28} aria-label="money cash" />
                <span className={styles.cash}>${("" + cash).replace(regExp.money, "$1,")}</span>
            </div>
            <div className={styles.info}>
                <Wallet size={28} aria-label="wallet cash" />
                {/* TODO: Переделать отображение с налички на карту когда будет готов основной функционал */}
                <span className={styles.cash}>${("" + wallet).replace(regExp.money, "$1,")}</span>
            </div>
        </div>
    );
};
