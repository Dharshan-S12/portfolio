import React from 'react';

import windowResize from './windowResize.png';
import maximize from './maximize.png';
import minimize from './minimize.png';
import computerBig from './computerBig.png';
import computerSmall from './computerSmall.png';
import myComputer from './myComputer.png';
import my_showcase from './my_showcase.png';
import doom from './doom.png';
import volumeOn from './volumeOn.png';
import volumeOff from './volumeOff.png';
import trailIcon from './trailIcon.png';
import windowGameIcon from './windowGameIcon.png';
import windowExplorerIcon from './windowExplorerIcon.png';
import windowsStartIcon from './windowsStartIcon.png';
import scrabbleIcon from './scrabbleIcon.png';
import close from './close.png';
import code_terminal from './code_terminal.png';
import tech_stack_portfolio from './tech_stack_portfolio.png';
import contact from './contact.png';
import resume from './resume.png';
import java from './java.png';
import carrer_timeline from './carrer_timeline.png';
import ownNote from './ownNote.png';
import algorithm from './algorithm.png';
import certificate from './certificate.png';
import projects_hub from './projects_hub.png';
import about_port from './about_port.png';
import skillsAchievements from './skills & achievements.png';
import BIO from './BIO.png';
import experience from './experience.png';
import snakegame from './snakegame.png';

const icons = {
    windowResize: windowResize,
    maximize: maximize,
    minimize: minimize,
    computerBig: computerBig,
    computerSmall: computerSmall,
    myComputer: myComputer,
    my_showcase: my_showcase,
    doom: doom,
    volumeOn: volumeOn,
    volumeOff: volumeOff,
    scrabbleIcon: scrabbleIcon,
    close: close,
    windowGameIcon: windowGameIcon,
    windowExplorerIcon: windowExplorerIcon,
    windowsStartIcon: windowsStartIcon,
    trailIcon: trailIcon,
    code_terminal: code_terminal,
    tech_stack_portfolio: tech_stack_portfolio,
    contact: contact,
    resume: resume,
    java: java,
    carrer_timeline: carrer_timeline,
    ownNote: ownNote,
    algorithm: algorithm,
    certificate: certificate,
    projects_hub: projects_hub,
    about_port: about_port,
    'skills & achievements': skillsAchievements,
    BIO: BIO,
    experience: experience,
    snakegame: snakegame,
};

export type IconName = keyof typeof icons;

const getIconByName = (
    iconName: IconName
    // @ts-ignore
): React.FC<React.SVGAttributes<SVGElement>> => icons[iconName];

export default getIconByName;
