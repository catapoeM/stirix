type Props = {
    type: "success" | "error" | "";
    text: string;
};

const Message = ({ type, text }: Props) => {
    const style = {
        padding: "10px",
        borderRadius: "5px",
        marginTop: "10px",
        color: type === "success" ? "green" : "red",
        border: `1px solid ${type === "success" ? "green" : "red"}`,
    };

    return <div style={style}>{text}</div>;
}

export default Message