import { useEffect, useState } from "react";

function Profile() {

    const [employee, setEmployee] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            setError("Please login first");
            return;
        }

        fetch("http://localhost:5000/api/employee/profile", {
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

            setEmployee(data);

        })
        .catch((error) => {

            setError(error.message);

        });

    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    if (!employee) {
        return <p>Loading...</p>;
    }

    return (
        <div>

            <h2>Employee Profile</h2>

            <p>
                <b>Employee ID:</b> {employee.empid}
            </p>

            <p>
                <b>Name:</b> {employee.name}
            </p>

            <p>
                <b>Email:</b> {employee.email}
            </p>

            <p>
                <b>Department:</b> {employee.department}
            </p>

            <p>
                <b>Basic Salary:</b> {employee.basicSalary}
            </p>

            <p>
                <b>HRA:</b> {employee.hra}
            </p>

            <p>
                <b>DA:</b> {employee.da}
            </p>

            <p>
                <b>Gross Salary:</b> {employee.grossSalary}
            </p>

        </div>
    );
}

export default Profile;