"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style/letter.scss";
import page from "../../style/page.module.scss";
import letter from "./style/letter.module.scss";

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/pro-solid-svg-icons'
library.add(fab, fas)

import Image from "next/image";
import moment from "moment";

const Button = ({ icon, text, onClick, href }) => {
    return href ?
        <a href={href} className={page.button}>
            <div className={page.icon_holder} >
                <FontAwesomeIcon icon={icon} />
            </div >
            <span className={page.text}>{text}</span>
        </a >
        :
        <button onClick={onClick} className={page.button}>
            <div className={page.icon_holder} >
                <FontAwesomeIcon icon={icon} />
            </div>
            <span className={page.text}>{text}</span>
        </button>
}

export default function Page({ params }) {

    const data = require(`./data/${params.receiver}.js`).default;

    return (
        <>
            <div className={page.page_controls}>
                <div>
                    <h1>Cover Letter</h1>
                </div>
                <div className={page.buttons}>
                    <Button icon={["fas", "print"]} text="Print or Download" onClick={(e) => window.print()} />
                </div>
            </div>
            <main className={page.page}>
                <header className="grid grid-cols-3 gap-4 bg-slate-100 rounded-lg p-3 leading-tight">
                    <div className="">
                        <p className="font-bold">{data.title}</p>
                    </div>
                    <div className="text-center">
                        <p>{moment(data.date).format("D.M.Y")}</p>
                    </div>
                    <div className="text-end">
                        <p>1/1</p>
                    </div>
                </header>
                <div className="grid grid-cols-11 gap-3 mt-4">
                    <h2 className="col-span-5 font-bold uppercase text-slate-600 text-sm ms-1 mb-1">Sender</h2>
                    <div />
                    <h2 className="col-span-5 font-bold uppercase text-slate-600 text-sm ms-1 mb-1">Receiver</h2>
                </div>
                <div className="grid grid-cols-11 gap-3 mb-4">
                    <div className="col-span-5 gap-4 bg-slate-100 rounded-lg p-2 leading-tight">
                        <div className="flex items-center justify-between gap-2 bg-slate-200 rounded-lg p-3 leading-tight mb-2">
                            <div className="w-[40px]">
                                <Image src={data.sender.avatar} width={40} height={40} className={letter.avatar} />
                            </div>
                            <div className="flex-grow">
                                <p className="font-bold">{data.sender.name}</p>
                                <p className="text-sm">{data.sender.title}</p>
                            </div>
                            {data.sender.url &&
                                <a href={data.sender.url} target="_blank" className="text-primary">
                                    <FontAwesomeIcon icon={["fas", "link"]} className="text-primary" fixedWidth />
                                </a>
                            }
                        </div>
                        <div className="flex flex-col gap-2 p-1">
                            <a href={`tel:${data.sender.email}`}>
                                <FontAwesomeIcon icon={["fas", "phone"]} className="text-primary me-2" fixedWidth />
                                {data.sender.email}
                            </a>
                            <a href={`tel:${data.sender.phone}`}>
                                <FontAwesomeIcon icon={["fas", "envelope"]} className="text-primary me-2" fixedWidth />
                                {data.sender.phone}
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <FontAwesomeIcon icon={["fas", "arrow-right"]} className="text-4xl text-slate-300" />
                    </div>
                    <div className="col-span-5 gap-3 bg-slate-100 rounded-lg p-2 leading-tight">
                        <div className="flex items-center gap-4 bg-slate-200 rounded-lg p-3 leading-tight mb-2">
                            <div className="w-[40px]">
                                <Image src={data.receiver.avatar} width={40} height={40} className={letter.avatar} />
                            </div>
                            <div className="flex-grow">
                                <p className="font-bold">{data.receiver.name}</p>
                                <p className="text-sm">{data.receiver.title}</p>
                            </div>
                            {data.receiver.url &&
                                <a href={data.receiver.url} target="_blank" className="text-primary">
                                    <FontAwesomeIcon icon={["fas", "link"]} className="text-primary" fixedWidth />
                                </a>
                            }
                        </div>
                        <div className="flex flex-col gap-2 p-1">
                            <a href={`tel:${data.receiver.email}`}>
                                <FontAwesomeIcon icon={["fas", "phone"]} className="text-primary me-2" fixedWidth />
                                {data.receiver.email}
                            </a>
                            <a href={`tel:${data.receiver.phone}`}>
                                <FontAwesomeIcon icon={["fas", "envelope"]} className="text-primary me-2" fixedWidth />
                                {data.receiver.phone}
                            </a>
                        </div>
                    </div>
                </div>
                <div dangerouslySetInnerHTML={{ "__html": data.content.replace(/\n/g, "<br />") }}>

                </div>
            </main>
            <p className="text-center print:hidden m-4">
                Page made with Next.js, React, Tailwind CSS and deployed to Vercel<br />
                <a href="https://github.com/korhox/korhox/" target="_blank" className="text-primary">View in GitHub</a>
            </p>
        </>
    )
}
