const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const bot = new Discord.Client();




bot.on('ready', async() => {
	console.log(bot.user.username + " is logged.");
	bot.user.setActivity("EV simulator");
});


bot.on('message', message => {

var check = setInterval(function checker() {
if (message.channel.type === 'text') {
	// Role that has access to $prune command
	if (message.member.roles.some(r => ["Owner", "Admin", "Moderators"].includes(r.name))) {
		if (message.content.startsWith(prefix + "prune")) {

		// Approved roles
		var roleID = message.guild.roles.get('534126069779791896').members.map(m=>m.user.id);

		// Non-approved roles (whole guild server-id)
		var allUsers = bot.guilds.get("532723582808358912").members.map(m=>m.user.id);

		// Duplicate-remover function
		allUsers = allUsers.filter(val => !roleID.includes(val));
		console.log(allUsers);

		var userLength = allUsers.length;
			for (var i = 0; i < userLength; i++) {
				var user = bot.fetchUser(allUsers[i]).then(user => {
					 // Messages sent to user
					 user.send("```Now You Know (Automated Alert) –– in-active Patreon subscription```");
					 user.send("**↳** If you don't renew your Patreon subscription within **24 hours, you will be kicked** :(");
					 user.send("**↳** If you cancelled your subscription for good, we'd like to know why!");
					 user.send("**↳** https://docs.google.com/forms/d/e/1FAIpQLSffOois5iu3c8M3H9KsN4PkI7VEjmpDd4KovJ2nzCriz0RlIg/viewform?usp=sf_link");

					 var hrs =  setTimeout(function hrsTimer() {
						 const member = message.guild.member(user);
						 member.kick("Unactivity. => Didn't have Patreon role");
						 console.log("Kicked " + user);
					 }, 86400000);

				});
			}

}
}
}
}, 90000000)
});

// $help command
bot.on('message', message => {
		if (message.channel.type === 'text') {
			if (message.member.roles.some(r => ["Owner", "Admin", "Moderators"].includes(r.name))) {
		  	if (message.content === prefix + "help") {
		    	message.reply("**$prune** –– Removes in-active Discord members with a cancelled Patreon subscription [Warns user, kicks them (takes 24 hours)");
		  	}
		}
	}
});




bot.login(token);
