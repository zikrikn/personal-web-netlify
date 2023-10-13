const Schedule = () => {
    return (
        <>
            <title>Jadwal Rutin - Semester 7</title>
            <style>
                {`
                    body {
                        overflow: hidden;
                        margin: 0;
                    }
                    .iframe-container {
                        margin: 10px;
                        width: calc(100% - 20px);
                        height: calc(100% - 20px);
                        position: absolute;
                    }
                    iframe {
                        width: 100%;
                        height: 100%;
                        border: none;
                    }
                `}
            </style>
            <div className="iframe-container">
                <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Asia%2FJakarta&title=Jadwal%20Semester%206&mode=WEEK&src=YzM2MGRzeDA4NzZAYmFuZ2tpdC5hY2FkZW15&src=Y183MGYwYWQ4NTIyMGFiMzhmZTJjZWE0OWQ1YmYyMTFiZjI2MGE3ZDJhYzMwOTg1ZjRiYWViOWY4OTFlZGViOWE5QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=ZW4uaW5kb25lc2lhbiNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23039BE5&color=%23EF6C00&color=%230B8043"></iframe>
            </div>
        </>
    );
};

export default Schedule;
