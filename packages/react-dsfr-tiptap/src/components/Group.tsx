import { ReactNode } from "react";
import { tss } from "tss-react";

interface IGroupProps {
    children: ReactNode;
}

function Group(props: IGroupProps) {
    const { children } = props;
    const { classes } = useStyles();

    return (
        <li>
            {children}
            <div aria-hidden="true" className={classes.divider}></div>
        </li>
    );
}

const useStyles = tss.withName(Group.name).create(() => ({
    divider: {
        borderRight: "1px solid var(--border-contrast-grey)",
    },
}));

export default Group;
