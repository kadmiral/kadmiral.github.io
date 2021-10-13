const brand_name = 'kadmiral'
var app = new Vue({
    el: '#should-i-use',
    data: {
        selected_profession: "",
        selected_feeling: "",
        selected_topic: "",
        // selected_profession: "dev",
        // selected_feeling: "dontcare",
        // selected_topic: "ceo_made_me",

        professions_db: {
            'dev': "Developer",
            'devops': "Devops",
            'cto': "CTO",
            'ceo': "CEO",
            'billing': "Billing person",
            'curious': "Curious George",
        },
        professions: function() {
            let professions_list = Object.keys(this.topic_db).map((topic) => {
                return this.topic_db[topic]['profession']
            });
            let professions = []
            professions_list.map(p => {
                p.map(prof => {
                    if (professions.includes(prof)) {
                        return undefined
                    }
                    professions.push(prof)
                })
            }).filter(p => {
                return p in this.professions_db
            })
            return professions.map(p => {
                return { "value": p, "text": this.professions_db[p] }
            })
        },

        feelings_db: {
            'love': 'love',
            'like': 'like',
            'dontcare': "don't really care about",
            'hate': 'hate',
            'billing': 'I am here to pay the bill',
        },
        feelings: function() {
            let feelings_list = Object.keys(this.topic_db).filter(topic => {
                return this.topic_db[topic]['profession'].includes(this.selected_profession)
            }).map((topic) => {
                return this.topic_db[topic]['feeling']
            });
            let feelings = []
            feelings_list.map(p => {
                p.map(prof => {
                    if (feelings.includes(prof)) {
                        return undefined
                    }
                    feelings.push(prof)
                })
            }).filter(p => {
                return p in this.feelings_db
            })
            return feelings.map(p => {
                return { "value": p, "text": this.feelings_db[p] }
            })
        },

        topics: function() {
            // v-if="topic.profession.includes(selected_profession) && topic.feeling.includes(selected_feeling)" 
            let emails = Object.keys(this.topic_db).map((topic) => {
                o = this.topic_db[topic]
                o["value"] = topic
                return o
            }).filter((o) => {
                return o["feeling"] && o["profession"] && o["feeling"].includes(this.selected_feeling) && o["profession"].includes(this.selected_profession)
            });
            return emails;

        },
        topic_db: {
            'dont_care_abstraction': {
                'text': 'that is the devops\'s job',
                'description': `That's right. Althoug it's good to know how your app is going to behave when you deploy or when it receives traffic, you should't reallt worry about it. ${brand_name} helps you abstract all the kubernetes pains and gives you a smooth developer experience!`,
                'feeling': ['dontcare'],
                'profession': ['dev'],
            },
            'i_love_serverless': {
                'text': 'serverless is better',
                'description': `That's right. Althoug it's good to know how your app is going to behave when you deploy or when it receives traffic, you should't reallt worry about it. ${brand_name} helps you abstract all the kubernetes pains and gives you a smooth developer experience!`,
                'feeling': ['hate'],
                'profession': ['dev'],
            },
            'good_stability': {
                'text': 'my app doesn\'t crash',
                'description': `Good for you! You are the one doing the right thing, kubernetes to get all the messy infrastructure out of your way so that you can keep delivering great apps. ${brand_name} makes sure you are going to get the best of kubernetes without having to deal with it. And we add some of developer tools on top, just to make your life easier.`,
                'feeling': ['like', 'love'],
                'profession': ['dev', 'devops'],
            },

            'ceo_made_me': {
                'text': `I'm being forced to use it`,
                'description': `That is sad. Would you like us to handle that for you? ${brand_name} takes care of kubernetes, you keep the company running.`,
                'feeling': ['hate', 'dontcare'],
                'profession': ['dev', 'devops', 'cto'],
            },
            'workload_portability': {
                'text': `I want workload portability.`,
                'description': `The good old dream of a fully automated lift and shift. AWS didn't give you a good deal? Switch to GCP with one button. That's ${brand_name}'s end goal, let's join forces!`,
                'feeling': ['love', 'like', 'hate', 'dontcare'],
                'profession': ['ceo', 'cto', 'devops'],
            },
            'pay_the_piper': {
                'text': `I'm here to pay.`,
                'description': `I'm without words. Thank you for your presence here, mythical billing person, holder of the credit cards, protector of finance! We welcome you! Here's your redcarpet! ❤️`,
                'feeling': ['love', 'like', 'hate', 'dontcare'],
                'profession': ['billing'],
            },
        }

    },
    methods: {
        form_topic_changed: function() {
            if (!this.selected_feeling || !this.selected_profession || !this.selected_topic) {
                return;
            }
        }
    },

})