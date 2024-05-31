/*

        ██████╗  █████╗  ██████╗ ███████╗███╗   ███╗██████╗     ██████╗ ██████╗      ██████╗  █████╗ ███╗   ███╗███████╗███╗   ███╗ ██████╗ ██████╗ ███████╗
        ██╔══██╗██╔══██╗██╔════╝ ██╔════╝████╗ ████║██╔══██╗    ██╔══██╗██╔══██╗    ██╔════╝ ██╔══██╗████╗ ████║██╔════╝████╗ ████║██╔═══██╗██╔══██╗██╔════╝
        ██████╔╝███████║██║  ███╗█████╗  ██╔████╔██║██████╔╝    ██████╔╝██████╔╝    ██║  ███╗███████║██╔████╔██║█████╗  ██╔████╔██║██║   ██║██║  ██║█████╗  
        ██╔══██╗██╔══██║██║   ██║██╔══╝  ██║╚██╔╝██║██╔═══╝     ██╔══██╗██╔═══╝     ██║   ██║██╔══██║██║╚██╔╝██║██╔══╝  ██║╚██╔╝██║██║   ██║██║  ██║██╔══╝  
        ██║  ██║██║  ██║╚██████╔╝███████╗██║ ╚═╝ ██║██║         ██║  ██║██║         ╚██████╔╝██║  ██║██║ ╚═╝ ██║███████╗██║ ╚═╝ ██║╚██████╔╝██████╔╝███████╗
        ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝     ╚═╝╚═╝         ╚═╝  ╚═╝╚═╝          ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝
                                                                        Author: shr0x
                                                                      ~How beasts do it~

*/

//---------------------------------------//
import { RAGERP } from "./api";
//---------------------------------------//
import "./commands";
//---------------------------------------//
import "./prototype/Player.prototype";
//---------------------------------------//
import "./serverevents/Auth.event";
import "./serverevents/Chat.event";
import "./serverevents/Server.event";
import "./serverevents/Character.event";
import "./serverevents/Player.event";
import "./serverevents/Inventory.event";
import "./serverevents/Death.event";
import "./serverevents/Vehicle.event";
import "./serverevents/Point.event";
//---------------------------------------//
import { blue, green, yellow } from "colorette";
//---------------------------------------//
async function initGamemode() {
    mp.events.delayInitialization = true;
    await RAGERP.database
        .initialize()
        .then(() => console.log("Database connected!"))
        .catch((err) => {
            throw new Error(err);
        });
    console.log(yellow("======================================================================================================"));
    console.log(green(" ██████╗  █████╗ ███╗   ███╗███████╗███╗   ███╗ ██████╗ ██████╗ ███████╗    ██╗███╗   ██╗██╗████████╗"));
    console.log(green("██╔════╝ ██╔══██╗████╗ ████║██╔════╝████╗ ████║██╔═══██╗██╔══██╗██╔════╝    ██║████╗  ██║██║╚══██╔══╝"));
    console.log(green("██║  ███╗███████║██╔████╔██║█████╗  ██╔████╔██║██║   ██║██║  ██║█████╗      ██║██╔██╗ ██║██║   ██║   "));
    console.log(green("██║   ██║██╔══██║██║╚██╔╝██║██╔══╝  ██║╚██╔╝██║██║   ██║██║  ██║██╔══╝      ██║██║╚██╗██║██║   ██║   "));
    console.log(green("╚██████╔╝██║  ██║██║ ╚═╝ ██║███████╗██║ ╚═╝ ██║╚██████╔╝██████╔╝███████╗    ██║██║ ╚████║██║   ██║   "));
    console.log(green(" ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝    ╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝   "));
    console.log(yellow("======================================================================================================"));
    //@ts-ignore
    console.log(blue(`Server Events: ${Object.values(mp.events.binded).length}`));
    console.log(blue(`Cef Events: ${RAGERP.cef.poolSize}`));
    console.log(blue(`Total Commands: ${RAGERP.commands._commands.size}`));
    mp.events.delayInitialization = false;
}
(async () => {
    await initGamemode().then(() => console.log("[SHROX FRAMEWORK] Gamemode Initialized"));
})();
