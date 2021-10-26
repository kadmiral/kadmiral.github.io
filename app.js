const brand_name = 'kadmiral'
var app = new Vue({
    el: "#should-i-use",
    data: {
        selected_profession: "",
        selected_feeling: "",
        selected_topic: "",
        // selected_profession: "dev",
        // selected_feeling: "dontcare",
        // selected_topic: "ceo_made_me",

        professions_db: {
            dev: "Developer",
            devops: "Devops",
            cto: "CTO",
            ceo: "CEO",
            billing: "Billing person",
            curious: "Curious George",
        },
        professions: function () {
            let professions_list = Object.keys(this.topic_db).map((topic) => {
                return this.topic_db[topic]["profession"];
            });
            let professions = [];
            professions_list
                .map((p) => {
                    p.map((prof) => {
                        if (professions.includes(prof)) {
                            return undefined;
                        }
                        professions.push(prof);
                    });
                })
                .filter((p) => {
                    return p in this.professions_db;
                });
            return professions.map((p) => {
                return { value: p, text: this.professions_db[p] };
            });
        },

        feelings_db: {
            love: "love",
            like: "like",
            dontcare: "don't really care about",
            hate: "hate",
            billing: "I am here to pay the bill",
        },
        feelings: function () {
            let feelings_list = Object.keys(this.topic_db)
                .filter((topic) => {
                    return this.topic_db[topic]["profession"].includes(
                        this.selected_profession
                    );
                })
                .map((topic) => {
                    return this.topic_db[topic]["feeling"];
                });
            let feelings = [];
            feelings_list
                .map((p) => {
                    p.map((prof) => {
                        if (feelings.includes(prof)) {
                            return undefined;
                        }
                        feelings.push(prof);
                    });
                })
                .filter((p) => {
                    return p in this.feelings_db;
                });
            return feelings.map((p) => {
                return { value: p, text: this.feelings_db[p] };
            });
        },

        topics: function () {
            // v-if="topic.profession.includes(selected_profession) && topic.feeling.includes(selected_feeling)"
            let emails = Object.keys(this.topic_db)
                .map((topic) => {
                    o = this.topic_db[topic];
                    o["value"] = topic;
                    return o;
                })
                .filter((o) => {
                    return (
                        o["feeling"] &&
                        o["profession"] &&
                        o["feeling"].includes(this.selected_feeling) &&
                        o["profession"].includes(this.selected_profession)
                    );
                });
            return emails;
        },
        topic_db: {
            dont_care_abstraction: {
                text: "that is the devops's job",
                description: `That's right. Although it's good to know how your app will behave when you deploy or when it receives traffic, you shouldn't really worry about it. ${brand_name} helps you abstract all the Kubernetes pains and gives you a smooth developer experience!`,
                feeling: ["dontcare"],
                profession: ["dev"],
            },
            i_love_serverless: {
                text: "serverless is better",
                description: `It depends. If you're talking about not having to worry about servers, then we have a treat for you!`,
                feeling: ["hate", "dontcare"],
                profession: ["dev"],
            },
            good_stability: {
                text: "my app doesn't crash",
                description: `Good for you! You are the one doing the right thing. ${brand_name} gets the infrastructure out of your way so that you can keep delivering great apps and still have the best of Kubernetes without knowing anything about it. And we add some awesome developer tools on top just to make your life easier.`,
                feeling: ["like", "love"],
                profession: ["dev", "devops"],
            },
            ceo_made_me: {
                text: `I'm being forced to use it`,
                description: `That is sad. Would you like us to handle that for you? ${brand_name} takes care of Kubernetes. You keep the company running.`,
                feeling: ["hate", "dontcare"],
                profession: ["dev", "devops", "cto"],
            },
            workload_portability: {
                text: `I want workload portability.`,
                description: `Dreaming of a fully functional lift and shift? Cloud X didn't give you a good deal? Port your workload to Cloud Y. Got some credits on Cloud Z? Let's send some apps there to use it. That's ${brand_name}'s end goal, to be a driver for cloud providers.`,
                feeling: ["love", "like", "hate", "dontcare"],
                profession: ["ceo", "cto", "devops"],
            },
            learning_kubernetes: {
                text: `I want to use it in production, but I'm not confident.`,
                description: `We've all been there. Of course, you are super excited with the new and shiny tech, but you have no idea how a production setup looks like. We will deploy a fully configured Kubernetes in your chosen cloud provider. And we add a dashboard for you to add apps and features to it. Then, whenever you feel like you got the hang of it, we hand off all controls back to you! It has always been your infrastructure.`,
                feeling: ["love", "like", "hate", "dontcare"],
                profession: ["ceo", "cto", "devops", "dev"],
            },
            pay_the_piper: {
                text: `I'm here to pay.`,
                description: `I'm without words. Thank you for your presence here, mythical billing person, holder of the credit cards, protector of finance! We welcome you! Here's your red carpet! ❤️`,
                feeling: ["love", "like", "hate", "dontcare"],
                profession: ["billing"],
            },
        },
    },
    methods: {
        form_topic_changed: function () {
            if (
                !this.selected_feeling ||
                !this.selected_profession ||
                !this.selected_topic
            ) {
                return;
            }
        },
    },
});