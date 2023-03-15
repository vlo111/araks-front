export type PropsSetState = {
    visible: boolean;
    setVisible: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}