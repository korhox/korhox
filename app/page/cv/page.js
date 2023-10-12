"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../style/page.scss";

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/pro-solid-svg-icons'
library.add(fab, fas)

import resume from "./resume.js";
import moment from "moment";


const Button = ({ icon, text, onClick, href }) => {
    return href ?
        <a href={href} className="cursor-pointer bg-white/70 flex items-center rounded-full">
            <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center" >
                <FontAwesomeIcon icon={icon} />
            </div >
            <span className="ps-3 pe-5 py-2 font-bold text-primary">{text}</span>
        </a >
        :
        <button onClick={onClick} className="cursor-pointer bg-white/70 flex items-center rounded-full">
            <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={icon} />
            </div>
            <span className="ps-3 pe-5 py-2 font-bold text-primary">{text}</span>
        </button>
}

const ProfileIcon = ({ network, username, link, icon }) => {
    icon = icon ? icon : ["fab", String(network).toLocaleLowerCase()]
    return (
        <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={icon} className="text-primary" fixedWidth title={network} />
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
            <div className="w-[210mm] mb-4 mt-10 flex justify-between print:hidden">
                <div>
                    <h1>CV - {resume.basics.name}</h1>
                </div>
                <div className="flex gap-4">
                    <Button icon={["fas", "print"]} text="Print or Download" onClick={(e) => window.print()} />
                    <Button icon={["fas", "inbox-in"]} text="Download JSON Resume" href="/api/download/resume" />
                </div>
            </div>
            <main className="m-4 mt-0 h-[297mm] w-[210mm] overflow-hidden rounded-xl bg-white p-8 shadow-xl flex gap-6 print:m-0 print:p-0 print:h-screen print:w-screen print:rounded-none print:shadow-none">
                <aside className="w-[30%] bg-slate-100 p-4 rounded-xl">
                    <img src="https://avatars.githubusercontent.com/u/10478812" className="w-full rounded-full border-2 border-slate-400 mb-4" />
                    {resume.basics.name && <h1>{resume.basics.name}</h1>}
                    {resume.basics.label && <p className="opacity-60 mb-4">{resume.basics.label}</p>}
                    {resume.basics.summary && <p className="text-sm">{resume.basics.summary}</p>}
                    <div className="my-4 flex flex-col gap-2">
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
                        <h2 className="ps-1 pb-1 text-lg">Lanuage Skills</h2>
                        {resume.languages && resume.languages.map((language, i) => (
                            <div key={"language-" + i} className="mb-2 p-3 bg-slate-200 rounded-lg flex">
                                <span className="text-sm font-semibold flex-1 pe-1">{language.language}</span>
                                <span className="text-sm font-normal">{language.fluency}</span>
                            </div>
                        ))}
                    </div>
                    <div className="my-10">
                        <h2 className="ps-1 pb-1 text-lg">Certifcates</h2>
                        {resume.certificates && resume.certificates.map((certificate, i) => (
                            <div key={"certificate-" + i} className="mb-2 p-3 bg-slate-200 rounded-lg flex items-center">
                                <h3 className="text-sm font-normal flex-1 pe-1">{certificate.shortName ? certificate.shortName : certificate.name}</h3>
                                {certificate.url && <a href={certificate.url} className="text-primary opacity-80 transition-all ease-in-out hover:scale-125 hover:opacity-100"><FontAwesomeIcon icon={["fas", "arrow-up-right-from-square"]} fixedWidth /></a>}
                            </div>
                        ))}
                    </div>
                </aside>
                <article className="w-[70%]">
                    <h2 className="ps-1 pb-1">Skills</h2>
                    <div className="p-3 bg-slate-100 rounded-lg">
                        {resume.skills && resume.skills.map((skill, i) => (
                            <div key={"skills-" + i} className="mb-2">
                                <h3>{skill.name}</h3>
                                <p className="opacity-60">{skill.summary}</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {skill.keywords && skill.keywords.map((keyword, j) => (
                                        <span key={"skill-" + j} className="bg-primary text-white px-2 py-[0.16rem] rounded-full inline-block text-xs">{keyword}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <h2 className="ps-1 pb-1">Work Experience</h2>
                    {resume.work && resume.work.map((work, i) => (
                        <div key={"work-" + i} className="mb-2 p-3 bg-slate-100 rounded-lg">
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
                    ))}
                    <h2 className="ps-1 pb-1">Education</h2>
                    {resume.education && resume.education.map((education, i) => (
                        <div key={"education-" + i} className="mb-2 p-3 bg-slate-100 rounded-lg">
                            <h3>{education.institution}</h3>
                            <p className="opacity-60 text-xs flex gap-1">
                                <span>
                                    {education.studyType}
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
                    ))}
                </article>
            </main >
        </>
    )
}
