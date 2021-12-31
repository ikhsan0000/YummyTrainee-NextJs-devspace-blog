import Image from "next/image";
import Layout from "../components/Layout";

export default function NotFoundPage() {
    return (
        <Layout title="Page not found">
            <div className="flex-1 flex-col item-center mt-20">
                <Image src="/images/logo.png" width={70} height={70}
                className="bg-gray-800 rounded-2xl"/>
                <h1 className="text-2xl text-gray-500 mt-5 mb-2">...ppssttt!</h1>
                <h2 className="text-4xl text-gray-400 mb-5">
                    Where are you going? This is nowhere! (404)
                </h2>
            </div>
        </Layout>
    )
}
