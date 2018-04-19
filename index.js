const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});

function makeChannel(message){
    var server = message.guild;
    var name = message.author.username;

    server.createChannel(name, "orbit-log");
}

bot.on("ready", async () => {
	
  console.log(`${bot.user.username} adlı bot ${bot.guilds.size} sunucusunda online!`);
  bot.user.setActivity(`&help - Official Orbit Bot`, {url: "https://www.twitch.tv/directory/game/Minecraft"});
	

});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
var msg = message.content.toUpperCase();
  var sender = message.author;

	
	if(message.content.includes("http")){
	if(message.member.hasPermission("MANAGE_MESSAGES")) return;
  	message.delete()
  	message.channel.send(`${message.author} Link paylaşımı yasaktır!`)
  }
	
	
  if (sender.id === "429357437641031680"){
  	return;
  }
	
	

		
		
  
	if(cmd === `${prefix}negro`){
	message.channel.send("", {
    file: "https://pbs.twimg.com/profile_images/704461285535182848/E_mW-3tV_400x400.jpg" // Or replace with FileOptions object
});
	}



	
  if(cmd === `${prefix}help`){

    let helpEmbed1 = new Discord.RichEmbed()
    .setTitle("Orbit Help Page For Mods/Admins")
    .setColor(botconfig.pembe)
    .addField("Punishment", "&ban <@nick> <reason>: Bans member.\n&kick <@nick> <reason>: Kicks member.\n&del: Deletes all messages from channel.")

    let helpEmbed2 = new Discord.RichEmbed()
    .setTitle("Orbit Help Page For Members")
    .setColor(botconfig.pembe)
    .addField("Commands", "&report <@nick> <reason>: Reports player.\n&bot: About bot.\n&server: About server.\n&hfma: Help for mods/admins.")


    message.channel.send(helpEmbed1);
    message.channel.send(helpEmbed2);
    return;
  }
	
	if(cmd === `${prefix}derinyardim`){

    let helpEmbed1 = new Discord.RichEmbed()
    .setTitle("MNSTRArmy Bot Derin Yardım Sayfası")
    .setColor(botconfig.pembe)
    .addField("Derinleş", "[+]Bir kullanıcıyı banlamak için rolünde 'Kullanıcıları yasakla' seçeneği açık olması gerek.\n[+]Bir kullanıcıyı atmak için rolünde 'Kullanıcıları At' seçeneği açık olması gerek.\n[+]Kanallara link göndermek için rolünde 'Mesajları Düzenle' seçeneğinin açık olması gerek\n[+]&del komutunda **YAZILAN KANALDAKİ BÜTÜN MESAJLAR** silinir, bu nedenle yanına bir rakam veya bir @kullanıcıadı girmene gerek yok\n[+]Eğer acil bir yardıma ihtiyacın varsa bana mesaj göndermeyi lütfen unutma: NoobZombie#5514")
		.addField("Davet Linki", "[Tıkla](https://discordapp.com/api/oauth2/authorize?client_id=434000273049124904&scope=bot&permissions=0)")
    message.channel.send(helpEmbed1);
    return;
  }

  if(cmd === `${prefix}kick`){
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Kullanıcı Bulunamıyor!");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Bunu yapmak için iznin yok!");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Bu kullanıcı atılamıyor!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("MNSTRArmy-Kick")
    .setColor(botconfig.pembe)
    .addField("Atılan kullanıcı:", `${kUser} ID ${kUser.id}`)
    .addField("Atan Kullanıcı:", `<@${message.author.id}> ID ${message.author.id}`)
    .addField("Atıldığı kanal:", message.channel)
    .addField("Zaman:", message.createdAt)
    .addField("Sebep:", kReason);


    message.channel.send(kickEmbed);
	 kUser.sendMessage(`${message.author.id} tarafından sunucudan atıldın. Sebep: ${kReason}`)
    return;
  }

  if(cmd === `${prefix}ban`){

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Kullanıcı Bulunamıyor!!");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("Yapamazsın...");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Bu kullanıcı atılamaz!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("MNSTRArmy-Ban")
    .setColor(botconfig.pembe)
    .addField("Yasaklanan Kullanıcı:", `${bUser} ID ${bUser.id}`)
    .addField("Yasaklayan Kullanıcı:", `<@${message.author.id}> ID ${message.author.id}`)
    .addField("Yasaklandığı kanal:", message.channel)
    .addField("Zaman:", message.createdAt)
    .addField("Sebep:", bReason);

				message.channel.send(`${bUser} **BANLANDI**`, {
    file: "http://gifimage.net/wp-content/uploads/2017/07/ban-hammer-gif-5.gif" // Or replace with FileOptions object
});
    message.guild.member(bUser).ban(bReason);


		bUser.sendMessage(`${message.author.id} tarafından sunucudan atıldın. Sebep: ${bReason}`)
    return;
  }
	
	if(cmd === `${prefix}del`){
	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Bunu yapmak için iznin yok!");
			 if (message.channel.type == 'text') {
        message.channel.fetchMessages()
          .then(messages => {
            message.channel.bulkDelete(messages);
            messagesDeleted = messages.array().length; // number of messages deleted

            // Logging the number of messages deleted on both the channel and console.
            message.channel.sendMessage("Başarılı! Şu kadar mesaj sildin: "+messagesDeleted);
            console.log('Deletion of messages successful. Total messages deleted: '+messagesDeleted)
          })
          .catch(err => {
            console.log('Silinemedi');
            console.log(err);
          });
						 
		
	
						 }
	}

  if(cmd === `${prefix}sikayet`){

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Kullanıcı Bulunamıyor!");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Şikeyetler")
    .setColor(botconfig.pembe)
    .addField("Şikeyet Edilen Kullanıcı:", `${rUser} ID: ${rUser.id}`)
    .addField("Şikayet Eden Kullanıcı:", `${message.author} ID: ${message.author.id}`)
    .addField("Kanal:", message.channel)
    .addField("Zaman:", message.createdAt)
    .addField("Sebep:", rreason);

    let reportschannel = message.guild.channels.find(`name`, "mnstrarmy-log");
    if(!reportschannel) return message.channel.send("log Kanalı Bulunamıyor!");


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

    return;
  }




  if(cmd === `${prefix}sunucu`){

    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Sunucu Hakkında")
    .setColor(botconfig.pembe)
    .setThumbnail(sicon)
    .addField("Sunucu Adı:", message.guild.name)
    .addField("Açılış Tarihi:", message.guild.createdAt)
    .addField("Katldığın Tarih:", message.member.joinedAt)
    .addField("Toplam Kullanıcı:", message.guild.memberCount);

    return message.channel.send(serverembed);
  }



  if(cmd === `${prefix}bot`){

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Hakkında")
    .setColor(botconfig.pembe)
    .setThumbnail(bicon)
    .addField("Bot İsmi:", bot.user.username)
    .addField("Yapılış Tarihi:", bot.user.createdAt)
    .addField("Geliştirici Ve Kullanıcı Adı: ", "NoobZombie, NoobZombie#5514")
	.addField("Durum:", "BETA IN-DEV")
    return message.channel.send(botembed);
  }

});

bot.login(process.env.BOT_TOKEN);
