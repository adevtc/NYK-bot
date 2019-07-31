

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
	if (message.member.roles.some(r => ["admin"].includes(r.name))) {
		console.log("access accepted.")
		if (message.content.startsWith(prefix + "prune")) {
	// Role that gets kicked via $prune command
		var roleID = message.guild.roles.get('603698401456029715').members.map(m=>m.user.id);
		console.log(roleID);

		// moves through array
		var userLength = roleID.length;
		for (var i = 0; i < userLength; i++) {
			var user = bot.fetchUser(roleID[i]).then(user => {
				 user.send('Hello!');

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
}, 90000000);
});


bot.login(token);
