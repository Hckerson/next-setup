import { Icon } from "./iconType";

export default function UploadIcon({
    styles,
    size = "2em",
    fill = "none",
    strokeWidth = 2,
    stroke = "currentColor",
}: Icon) {
    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                viewBox="0 0 24 24"
                className={styles}
            >
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                    fill={fill}
                    stroke={stroke}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={strokeWidth}
                    d="M12 10v9m0-9l3 3m-3-3l-3 3m8.5 2c1.519 0 2.5-1.231 2.5-2.75a2.75 2.75 0 0 0-2.016-2.65A5 5 0 0 0 8.37 8.108a3.5 3.5 0 0 0-1.87 6.746"
                />
            </svg>
        </>
    );
}
