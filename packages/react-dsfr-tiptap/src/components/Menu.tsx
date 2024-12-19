import { fr } from "@codegouvfr/react-dsfr";
import { ReactNode } from "react";
import { tss } from "tss-react";

interface IMenuProps {
    children: ReactNode;
    first?: boolean;
    last?: boolean;
}

function Menu(props: IMenuProps) {
    const { children, first, last } = props;
    const { classes, cx } = useStyles();

    return <ul className={cx(classes.root, { [classes.first]: first, [classes.last]: last })}>{children}</ul>;
}

const useStyles = tss.withName(Menu.name).create(() => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        listStyleType: "none",
        margin: 0,
        padding: 0,
        borderTop: "1px solid var(--border-contrast-grey)",
        borderBottom: "1px solid var(--border-contrast-grey)",
        backgroundImage: "linear-gradient(0deg, var(--border-contrast-grey), var(--border-contrast-grey) 3.125%, transparent 3.125%, transparent)",
        backgroundSize: `100% calc(${fr.spacing("4w")} + 1px)`,
        gap: "1px 0",
        "> li": {
            padding: 0,
            display: "flex",
            flexWrap: "wrap",
            gap: "1px 0",
        },
    },
    first: {
        borderTop: 0,
    },
    last: {
        borderBottom: 0,
    },
}));

export default Menu;
