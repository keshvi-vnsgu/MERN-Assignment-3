import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Leave() {

    const navigate = useNavigate();

    const [date, setDate] = useState("");
    const [reason, setReason] = useState("");
    const [grant, setGrant] = useState("No");

    const applyLeave = async (e) => {

        e.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login first");
            navigate("/");
            return;
        }

        try {

            const response = await fetch(
                "http://localhost:5000/api/employee/leave/add",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    },

                    body: JSON.stringify({
                        date: date,
                        reason: reason,
                        grant: grant
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {

                alert("Leave application submitted");

                setDate("");
                setReason("");
                setGrant("No");

            } else {

                alert(data.message);
            }

        } catch (error) {

            alert("Unable to connect to server");

        }
    };

    return (
        <div>

            <h2>Application for Leave</h2>

            <form onSubmit={applyLeave}>

                <div>
                    <label>Date:</label>

                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Reason:</label>

                    <input
                        type="text"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        required
                    />
                </div>

                <br />

                <div>

                    <label>Grant:</label>

                    <select
                        value={grant}
                        onChange={(e) => setGrant(e.target.value)}
                    >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>

                </div>

                <br />

                <button type="submit">
                    Add Leave
                </button>

            </form>

        </div>
    );
}

export default Leave;