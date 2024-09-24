const Schedule = () => {
    return (
        <>
            <title>Jadwal Punya Zikri</title>
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
               <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FJakarta&bgcolor=%23ffffff&title=Zikri's%20Schedule&mode=WEEK&showNav=0&showTabs=0&showCalendars=0&src=emlrcmlraG9saWZhaDg5OEBnbWFpbC5jb20&color=%2333ae06"></iframe>
            </div>
        </>
    );
};

export default Schedule;
