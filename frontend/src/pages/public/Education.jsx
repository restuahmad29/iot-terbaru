export default function Education() {

    const articles = [

        {
            title: "Cara Merawat Tanaman",
            content:
            "Tanaman membutuhkan penyiraman yang cukup dan pencahayaan yang baik."
        },

        {
            title: "Pentingnya Kelembaban Tanah",
            content:
            "Kelembaban tanah membantu pertumbuhan akar tanaman."
        },

        {
            title: "Manfaat IoT Untuk Pertanian",
            content:
            "IoT membantu monitoring tanaman secara realtime."
        }

    ];

    return (

        <div className="p-10 bg-gray-100 min-h-screen">

            <h1 className="text-4xl font-bold mb-10">

                Edukasi Tanaman

            </h1>

            <div className="grid grid-cols-3 gap-5">

                {
                    articles.map((item, index) => (

                        <div
                        key={index}
                        className="bg-white p-5 rounded-xl shadow"
                        >

                            <h2 className="text-2xl font-bold mb-3">

                                {item.title}

                            </h2>

                            <p>

                                {item.content}

                            </p>

                        </div>
                    ))
                }

            </div>

        </div>
    );
}