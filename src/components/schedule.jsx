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
                    .link-container {
                        position: absolute;
                        top: 10px;
                        right: 10px;
                        z-index: 1;
                    }
                    .link-container a {
                        font-family: Arial, sans-serif;
                        text-decoration: none;
                        color: #333;
                        background-color: #f0f0f0;
                        padding: 10px 15px;
                        border-radius: 5px;
                        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
                    }
                    .link-container a:hover {
                        background-color: #e0e0e0;
                    }
                `}
            </style>
            <div className="link-container">
                <a href="https://www.notion.so/zikri/79c53404ab45489ea6033559c69922cd?v=65316499194b4c5c8b21a13a2b71d5b4&pvs=4" target="_blank" rel="noopener noreferrer">
                    the objectives
                </a>
            </div>
            <div className="iframe-container">
               <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FJakarta&bgcolor=%23ffffff&title=Zikri's%20Schedule&mode=WEEK&showPrint=0&showNav=0&showTabs=0&showCalendars=0&src=emlrcmlraG9saWZhaDg5OEBnbWFpbC5jb20&color=%2333ae06"></iframe>
            </div>
        </>
    );
};

export default Schedule;
