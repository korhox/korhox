"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../style/page.scss";
import page from "../style/page.module.scss";
import cv from "./style/cv.module.scss";

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/pro-solid-svg-icons'
library.add(fab, fas)

import resume from "./resume.js";
import moment from "moment";
import Image from "next/image";


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


const ProfileIcon = ({ network, username, link, icon }) => {
    icon = icon ? icon : ["fab", String(network).toLocaleLowerCase()]
    return (
        <div className={cv.item}>
            <FontAwesomeIcon icon={icon} className={cv.icon} fixedWidth title={network} />
            <a href={link} target="_blank">{username}</a>
        </div>
    )
}

const formatDuration = (period) => {
    let parts = [];
    const duration = moment.duration(period);

    if (!duration || duration.toISOString() === "P0D") return;

    if (duration.years() >= 1) {
        const years = Math.floor(duration.years());
        parts.push(years + " " + (years > 1 ? "yrs" : "yr"));
    }

    if (duration.months() >= 1) {
        const months = Math.floor(duration.months());
        parts.push(months + " " + (months > 1 ? "mos" : "mo"));
    }

    return parts.join(" ");
}



export default function Page() {

    return (
        <>
            <div className={page.page_controls}>
                <div>
                    <h1>CV - {resume.basics.name}</h1>
                </div>
                <div className={page.buttons}>
                    <Button icon={["fas", "print"]} text="Print or Download" onClick={(e) => window.print()} />
                    <Button icon={["fas", "inbox-in"]} text="Download JSON Resume" href="/api/download/resume" />
                </div>
            </div>
            <main className={page.page + " flex"}>
                <aside className={cv.sidebar}>
                    <div>
                        <img src="https://avatars.githubusercontent.com/u/10478812" className={cv.avatar} />
                        {resume.basics.name && <h1>{resume.basics.name}</h1>}
                        {resume.basics.label && <p className={cv.label}>{resume.basics.label}</p>}
                        {resume.basics.summary && <p className={cv.summary}>{resume.basics.summary}</p>}
                        <div className={cv.profile}>
                            {resume.basics.email && (
                                <ProfileIcon network="Email" icon="envelope" username={resume.basics.email} url={`mailto:${resume.basics.email}`} />
                            )}
                            {resume.basics.url && (
                                <ProfileIcon network="Website" icon="link" username={resume.basics.url} url={resume.basics.url} />
                            )}
                            {resume.basics.profiles && resume.basics.profiles.map((profile, i) => (
                                <ProfileIcon key={"profile-" + i} network={profile.network} icon={profile.icon} username={profile.username} link={profile.url} />
                            ))}
                        </div>
                        <div className="my-10">
                            <h2>Lanuage Skills</h2>
                            {resume.languages && resume.languages.map((language, i) => (
                                <div key={"language-" + i} className="mb-2 p-3 bg-slate-200 rounded-lg flex">
                                    <span className="text-sm font-semibold flex-1 pe-1">{language.language}</span>
                                    <span className="text-sm font-normal">{language.fluency}</span>
                                </div>
                            ))}
                        </div>
                        <div className="my-10">
                            <h2>Certifcates</h2>
                            {resume.certificates && resume.certificates.map((certificate, i) => (
                                <div key={"certificate-" + i} className="mb-2 p-3 bg-slate-200 rounded-lg flex items-center">
                                    <h3 className="text-sm font-normal flex-1 pe-1">{certificate.shortName ? certificate.shortName : certificate.name}</h3>
                                    {certificate.url && <a href={certificate.url} className="text-primary opacity-80 transition-all ease-in-out hover:scale-125 hover:opacity-100"><FontAwesomeIcon icon={["fas", "arrow-up-right-from-square"]} fixedWidth /></a>}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        Online version of this CV is available at <a href="https://korho.fi/cv" className="text-primary">korho.fi/cv</a>
                    </div>
                </aside>
                <article className={cv.article}>
                    <h2 className="ps-1 pb-1">Skills</h2>
                    <div className="p-3 bg-slate-100 rounded-lg flex flex-col gap-3">
                        {resume.skills && resume.skills.map((skill, i) => (
                            <div key={"skills-" + i}>
                                <h3 className="text-xs">{skill.name}</h3>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {skill.keywords && skill.keywords.map((keyword, j) => (
                                        <span key={"skill-" + j} className="bg-primary text-white px-2 py-[0.16rem] rounded-full inline-block text-xs">{keyword}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <h2 className="ps-1 pb-1">Work Experience</h2>
                    <div className="p-3 bg-slate-100 rounded-lg flex flex-col gap-3">
                        {resume.work && resume.work.map((work, i) => (
                            <div key={"work-" + i} className="flex gap-3 [&:not(:last-child)]:border-b border-slate-200 [&:not(:last-child)]:pb-3">
                                <div className="min-w-[34px]">
                                    {work.logo ?
                                        <Image src={work.logo} alt={work.name} width={34} height={34} className="rounded-lg" />
                                        :
                                        <div className="bg-slate-200 text-primary rounded-lg w-[34px] h-[34px] flex items-center justify-center">
                                            <FontAwesomeIcon icon={["fas", "briefcase"]} fixedWidth />
                                        </div>
                                    }
                                </div>
                                <div>
                                    <h3>{work.position}</h3>
                                    <p className="opacity-60 text-xs flex gap-1">
                                        <span>
                                            {work.name}
                                        </span>
                                        <span className="opacity-50">•</span>
                                        <span>
                                            {moment(work.startDate).format("MMM YYYY")} » {work.endDate ? moment(work.endDate).format("MMM YYYY") : "Present"}
                                        </span>
                                        <span className="opacity-50">•</span>
                                        <span>
                                            {/* Add two days to calculate months correctly */}
                                            {formatDuration(moment(work.endDate).add("2", "days").diff(moment(work.startDate)))}
                                        </span></p>
                                    <p>{work.summary}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <h2 className="ps-1 pb-1">Education</h2>
                    <div className="p-3 bg-slate-100 rounded-lg flex flex-col gap-3">
                        {resume.education && resume.education.map((education, i) => (
                            <div key={"education-" + i} className="flex gap-3 [&:not(:last-child)]:border-b border-slate-200 [&:not(:last-child)]:pb-3">
                                <div className="min-w-[34px]">
                                    {education.logo ?
                                        <Image src={education.logo} alt={education.name} width={34} height={34} className="rounded-lg" />
                                        :
                                        <div className="bg-slate-200 text-primary rounded-lg w-[34px] h-[34px] flex items-center justify-center">
                                            <FontAwesomeIcon icon={["fas", "graduation-cap"]} fixedWidth />
                                        </div>
                                    }
                                </div>
                                <div>
                                    <h3>{education.institution}</h3>
                                    <p className="opacity-60 text-xs flex gap-1">
                                        <span>
                                            {education.studyType}
                                        </span>
                                        <span className="opacity-50">•</span>
                                        <span>
                                            {education.credits} cr
                                        </span>
                                        <span className="opacity-50">•</span>
                                        <span>
                                            {moment(education.startDate).format("MMM YYYY")} » {education.endDate ? moment(education.endDate).format("MMM YYYY") : "Present"}
                                        </span>
                                        <span className="opacity-50">•</span>
                                        <span>
                                            {/* Add two days to calculate months correctly */}
                                            {formatDuration(moment(education.endDate).add("2", "days").diff(moment(education.startDate)))}
                                        </span></p>
                                    <p>{education.summary}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </article>
            </main >
            <p className="text-center print:hidden m-4">
                Page made with Next.js, React, Tailwind CSS and deployed to Vercel<br />
                <a href="https://github.com/korhox/korhox/" target="_blank" className="text-primary">View in GitHub</a>
            </p>
        </>
    )
}
