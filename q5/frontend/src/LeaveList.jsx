import { useEffect, useState } from "react";

function LeaveList() {

    const [leaves, setLeaves] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            setError("Please login first");
            return;
        }

        fetch("http://localhost:5000/api/employee/leave/list", {
            method: "GET",

            headers: {
                "Authorization": token
            }
        })
        .then(async (response) => {

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            return data;
        })
        .then((data) => {

            setLeaves(data);

        })
        .catch((error) => {

            setError(error.message);

        });

    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>

            <h2>Leave List</h2>

            {leaves.length === 0 ? (

                <p>No leave applications found.</p>

            ) : (

                <table border="1">

                    <thead>

                        <tr>
                            <th>Date</th>
                            <th>Reason</th>
                            <th>Grant</th>
                        </tr>

                    </thead>

                    <tbody>

                        {leaves.map((leave) => (

                            <tr key={leave._id}>

                                <td>
                                    {new Date(leave.date).toLocaleDateString()}
                                </td>

                                <td>
                                    {leave.reason}
                                </td>

                                <td>
                                    {leave.grant}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            )}

        </div>
    );
}

export default LeaveList;