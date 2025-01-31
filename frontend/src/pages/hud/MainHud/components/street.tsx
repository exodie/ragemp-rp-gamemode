import { FC } from "react";

import styles from "../mainhud.module.scss";

type Props = {
    area: string;
    street?: string;
};

export const StreetOutput: FC<Props> = ({ area, street }) => {
    return (
        <div className={styles.areainfo}>
            <div className={styles.areadata}>
                {/* TODO: Сейчас контейнер с информацией о улице и районе двигается при изменении длины текста, поправить! */}
                <span className={styles.areaname}>{area}</span>
                {street && <span className={styles.streetname}>{street}</span>}
            </div>
        </div>
    );
};
