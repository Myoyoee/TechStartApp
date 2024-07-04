class TechStartupTycoon {
    constructor() {
        this.money = 1000;
        this.employees = [];
        this.reputation = 0;
        this.products = [];
        this.officeUpgrades = [
            { name: "Better Computers", cost: 5000, effect: "productivity", amount: 1.2 },
            { name: "Coffee Machine", cost: 2000, effect: "productivity", amount: 1.1 },
            { name: "Ergonomic Chairs", cost: 3000, effect: "productivity", amount: 1.15 }
        ];
        this.marketingCampaigns = [
            { name: "Social Media", cost: 1000, effect: "reputation", amount: 20 },
            { name: "TV Commercial", cost: 5000, effect: "reputation", amount: 50 },
            { name: "Influencer Partnership", cost: 3000, effect: "reputation", amount: 30 }
        ];
        this.technologyTree = {
            "Mobile App": { cost: 5000, required: [] },
            "Web Application": { cost: 7000, required: [] },
            "AI Integration": { cost: 10000, required: ["Mobile App", "Web Application"] },
            "Blockchain": { cost: 15000, required: ["Web Application"] },
            "VR Experience": { cost: 20000, required: ["Mobile App", "AI Integration"] }
        };
        this.unlockedTechnologies = [];
        this.competitors = [
            { name: "TechCorp", power: 1 },
            { name: "InnovateCo", power: 1.2 },
            { name: "FutureTech", power: 0.8 }
        ];
        this.achievements = [
            { name: "First Million", description: "Reach $1,000,000 in total revenue", achieved: false },
            { name: "Tech Pioneer", description: "Unlock all technologies", achieved: false },
            { name: "Market Dominator", description: "Become more powerful than all competitors", achieved: false }
        ];
        this.totalRevenue = 0;
        this.initializeUI();
        this.startGameLoop();
    }

    initializeUI() {
        document.getElementById('develop-product').addEventListener('click', () => this.developProduct());
        document.getElementById('hire-employee').addEventListener('click', () => this.hireEmployee());
        document.getElementById('seek-funding').addEventListener('click', () => this.seekFunding());
        document.getElementById('launch-marketing').addEventListener('click', () => this.launchMarketingCampaign());
        document.getElementById('research-tech').addEventListener('click', () => this.showTechTree());
        this.updateUI();
    }

    updateUI() {
        document.getElementById('money').textContent = this.formatMoney(this.money);
        document.getElementById('employees').textContent = this.employees.length;
        document.getElementById('reputation').textContent = this.reputation;

        this.updateProductList();
        this.updateEmployeeList();
        this.updateUpgradeList();
        this.updateTechList();
        this.updateCompetitors();
        this.updateAchievements();
    }

    formatMoney(amount) {
        return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }

    updateProductList() {
        const productList = document.getElementById('product-list');
        productList.innerHTML = '';
        this.products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.textContent = `${product.name} - Revenue: $${this.formatMoney(product.revenue)}/day`;
            productList.appendChild(productElement);
        });
    }

    updateEmployeeList() {
        const employeeList = document.getElementById('employee-list');
        employeeList.innerHTML = '';
        this.employees.forEach(employee => {
            const employeeElement = document.createElement('div');
            employeeElement.textContent = `${employee.name} - ${employee.skill} (Productivity: ${employee.productivity.toFixed(2)})`;
            employeeList.appendChild(employeeElement);
        });
    }

    updateUpgradeList() {
        const upgradeList = document.getElementById('upgrade-list');
        upgradeList.innerHTML = '';
        this.officeUpgrades.forEach(upgrade => {
            const upgradeElement = document.createElement('button');
            upgradeElement.textContent = `${upgrade.name} - $${this.formatMoney(upgrade.cost)}`;
            upgradeElement.addEventListener('click', () => this.purchaseUpgrade(upgrade));
            upgradeList.appendChild(upgradeElement);
        });
    }

    updateTechList() {
        const techList = document.getElementById('tech-list');
        techList.innerHTML = '';
        for (const [tech, details] of Object.entries(this.technologyTree)) {
            const techElement = document.createElement('div');
            techElement.textContent = `${tech} - ${this.unlockedTechnologies.includes(tech) ? 'Unlocked' : `Cost: $${this.formatMoney(details.cost)}`}`;
            techList.appendChild(techElement);
        }
    }

    updateCompetitors() {
        const competitorList = document.getElementById('competitor-list');
        competitorList.innerHTML = '';
        this.competitors.forEach(competitor => {
            const competitorElement = document.createElement('div');
            competitorElement.textContent = `${competitor.name} - Power: ${competitor.power.toFixed(2)}`;
            competitorList.appendChild(competitorElement);
        });
    }

    updateAchievements() {
        const achievementList = document.getElementById('achievement-list');
        achievementList.innerHTML = '';
        this.achievements.forEach(achievement => {
            const achievementElement = document.createElement('div');
            achievementElement.textContent = `${achievement.name}: ${achievement.description}`;
            achievementElement.classList.add(achievement.achieved ? 'achieved' : 'not-achieved');
            achievementList.appendChild(achievementElement);
        });
    }

    developProduct() {
        const cost = 500 + (this.products.length * 100);
        if (this.money >= cost) {
            this.money -= cost;
            const product = {
                name: `Product ${this.products.length + 1}`,
                revenue: Math.floor(Math.random() * 100) + 50
            };
            this.products.push(product);
            this.reputation += 10;
            this.updateUI();
            this.showNotification(`Developed ${product.name}!`);
        } else {
            this.showNotification("Not enough money to develop a product!");
        }
    }

    hireEmployee(isFree = false) {
        const cost = isFree ? 0 : 1000 + (this.employees.length * 500);
        if (this.money >= cost) {
            if (!isFree) this.money -= cost;
            const skills = ["Programming", "Design", "Marketing", "Management"];
            const employee = {
                name: `Employee ${this.employees.length + 1}`,
                productivity: Math.floor(Math.random() * 5) + 1,
                skill: skills[Math.floor(Math.random() * skills.length)],
                experience: 0
            };
            this.employees.push(employee);
            this.updateUI();
            this.showNotification(`Hired ${employee.name} with ${employee.skill} skills!`);
        } else {
            this.showNotification("Not enough money to hire an employee!");
        }
    }

    seekFunding() {
        const funding = Math.floor(Math.random() * 10000) + 1000;
        this.money += funding;
        this.updateUI();
        this.showNotification(`Received $${this.formatMoney(funding)} in funding!`);
    }

    launchMarketingCampaign() {
        const campaign = this.marketingCampaigns[Math.floor(Math.random() * this.marketingCampaigns.length)];
        if (this.money >= campaign.cost) {
            this.money -= campaign.cost;
            this.reputation += campaign.amount;
            this.updateUI();
            this.showNotification(`Launched ${campaign.name} campaign! Reputation increased by ${campaign.amount}.`);
        } else {
            this.showNotification("Not enough money for a marketing campaign!");
        }
    }

    showTechTree() {
        const techTreeModal = document.createElement('div');
        techTreeModal.id = 'tech-tree-modal';
        techTreeModal.innerHTML = '<h2>Technology Tree</h2>';
        
        for (const [tech, details] of Object.entries(this.technologyTree)) {
            const techElement = document.createElement('div');
            techElement.textContent = `${tech} - Cost: $${this.formatMoney(details.cost)}`;
            if (this.unlockedTechnologies.includes(tech)) {
                techElement.classList.add('unlocked');
            } else if (this.canUnlockTechnology(tech)) {
                const unlockButton = document.createElement('button');
                unlockButton.textContent = 'Unlock';
                unlockButton.addEventListener('click', () => this.unlockTechnology(tech));
                techElement.appendChild(unlockButton);
            } else {
                techElement.classList.add('locked');
            }
            techTreeModal.appendChild(techElement);
        }

        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.addEventListener('click', () => document.body.removeChild(techTreeModal));
        techTreeModal.appendChild(closeButton);

        document.body.appendChild(techTreeModal);
    }

    canUnlockTechnology(tech) {
        const details = this.technologyTree[tech];
        return this.money >= details.cost && details.required.every(req => this.unlockedTechnologies.includes(req));
    }

    unlockTechnology(tech) {
        const details = this.technologyTree[tech];
        if (this.canUnlockTechnology(tech)) {
            this.money -= details.cost;
            this.unlockedTechnologies.push(tech);
            this.showNotification(`Unlocked ${tech} technology!`);
            this.updateUI();
            document.body.removeChild(document.getElementById('tech-tree-modal'));
            this.showTechTree();
        }
    }

    purchaseUpgrade(upgrade) {
        if (this.money >= upgrade.cost) {
            this.money -= upgrade.cost;
            this.applyUpgrade(upgrade);
            this.updateUI();
            this.showNotification(`Purchased ${upgrade.name}!`);
        } else {
            this.showNotification("Not enough money for this upgrade!");
        }
    }

    applyUpgrade(upgrade) {
        if (upgrade.effect === "productivity") {
            this.employees.forEach(employee => {
                employee.productivity *= upgrade.amount;
            });
        }
    }

    generateRandomEvent() {
        const events = [
            { name: "Market Crash", effect: () => { this.money *= 0.8; this.showNotification("Market Crash! You lost 20% of your money."); } },
            { name: "Viral Product", effect: () => { this.reputation += 50; this.showNotification("One of your products went viral! Reputation increased."); } },
            { name: "Talent Acquisition", effect: () => { this.hireEmployee(true); this.showNotification("A talented developer joined your team for free!"); } },
            { name: "Competitor Bankruptcy", effect: () => { this.competitors.pop(); this.showNotification("A competitor went bankrupt!"); } }
        ];

        const randomEvent = events[Math.floor(Math.random() * events.length)];
        randomEvent.effect();
    }

    startGameLoop() {
        setInterval(() => {
            this.generateRevenue();
            this.updateEmployeeExperience();
            this.updateCompetitorPower();
            this.checkAchievements();
            if (Math.random() < 0.1) this.generateRandomEvent(); // 10% chance of random event each tick
            this.updateUI();
        }, 1000);
    }

    generateRevenue() {
        let totalRevenue = 0;
        this.products.forEach(product => {
            totalRevenue += product.revenue * (1 + (this.unlockedTechnologies.length * 0.1));
        });
        totalRevenue *= this.calculateProductivityMultiplier();
        this.money += totalRevenue;
        this.totalRevenue += totalRevenue;
    }

    calculateProductivityMultiplier() {
        let multiplier = 1;
        this.employees.forEach(employee => {
            multiplier += employee.productivity * 0.1;
        });
        return multiplier;
    }

    updateEmployeeExperience() {
        this.employees.forEach(employee => {
            employee.experience += 0.1;
            if (employee.experience >= 10) {
                employee.productivity *= 1.1;
                employee.experience = 0;
                this.showNotification(`${employee.name} leveled up! Productivity increased.`);
            }
        });
    }

    updateCompetitorPower() {
        this.competitors.forEach(competitor => {
            competitor.power *= 1 + (Math.random() * 0.02 - 0.01); // -1% to +1% change
        });
    }

    checkAchievements() {
        if (this.totalRevenue >= 1000000 && !this.achievements[0].achieved) {
            this.achievements[0].achieved = true;
            this.showNotification("Achievement unlocked: First Million!");
        }
        if (this.unlockedTechnologies.length === Object.keys(this.technologyTree).length && !this.achievements[1].achieved) {
            this.achievements[1].achieved = true;
            this.showNotification("Achievement unlocked: Tech Pioneer!");
        }
        if (this.competitors.every(competitor => competitor.power < this.calculateProductivityMultiplier()) && !this.achievements[2].achieved) {
            this.achievements[2].achieved = true;
            this.showNotification("Achievement unlocked: Market Dominator!");
        }
    }

    showNotification(message) {
        const notifications = document.getElementById('notifications');
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notifications.appendChild(notification);

        // Trigger reflow
        notification.offsetHeight;

        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notifications.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

const game = new TechStartupTycoon();