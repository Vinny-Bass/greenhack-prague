import "./FomoBtn.css";

// eslint-disable-next-line react/prop-types
export default function FomoBtn({ label, onClick }) {
    return (
        <button className="buy-button" onClick={onClick}>{label}</button>
    )
}