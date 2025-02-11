import { RAGERP } from "@api";
import { BanEntity } from "@entities/Ban.entity";
import { CharacterEntity } from "@entities/Character.entity";
import { entityAttachments } from "@modules/Attachments.module";

async function onPlayerJoin(player: PlayerMp) {
    try {
        const banData = await RAGERP.database.getRepository(BanEntity).findOne({
            where: [{ serial: player.serial }, { ip: player.ip }, { username: player.name }, { rsgId: player.rgscId }]
        });

        if (banData) {
            if (RAGERP.utils.hasDatePassedTimestamp(parseInt(banData.lifttime))) {
                await RAGERP.database.getRepository(BanEntity).delete({ id: banData.id });
            } else {
                player.kick(`Banned: ${banData.reason}`);
                return;
            }
        }
        player.account = null;
        player.character = null;
        player.lastPosition = null;
        player.emoteTimeout = null;
        player.setVariable("loggedin", false);
        player.setVariable("isSpectating", false);
        player.setVariable("adminLevel", 0);
        player.setVariable("emoteText", null);
        player.cdata = {};
    } catch (err) {
        console.error(err);
    }
}
async function onPlayerQuit(player: PlayerMp) {
    const character = player.character;
    if (!character) return;
    const lastPosition = { ...player.position };

    await RAGERP.database.getRepository(CharacterEntity).update(character.id, {
        position: { x: lastPosition.x, y: lastPosition.y, z: lastPosition.z, heading: player.heading },
        lastlogin: character.lastlogin,
        deathState: character.deathState,
        cash: character.cash
    });
}


mp.events.add({
    "playerQuit": onPlayerQuit,
    "playerJoin": onPlayerJoin
})


mp.events.add("server::spectate:stop", async (player: PlayerMp) => {
    if (!player || !mp.players.exists(player)) return;
    player.setVariable("isSpectating", false);
    player.call("client::spectate:stop");
});

mp.events.add("server::player:noclip", (player: PlayerMp, status) => {
    player.setVariable("noclip", status);
    mp.players.forEachInRange(player.position, mp.config["stream-distance"], (nearbyPlayer) => {
        nearbyPlayer.call("client::player:noclip", [player.id, status]);
    });
});

mp.events.add("entityCreated", (entity) => {
    if (["vehicle", "player"].includes(entity.type)) {
        entityAttachments.initFunctions(entity as VehicleMp | PlayerMp);
    }
});

RAGERP.cef.register("settings", "changePassword", (player: PlayerMp) => { });
