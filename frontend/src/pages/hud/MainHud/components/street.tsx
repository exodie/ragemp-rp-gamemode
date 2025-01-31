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
                <span className={styles.areaname}>{area}</span>
                {street && <span className={styles.streetname}>{street}</span>}
            </div>
        </div>
    );
};
