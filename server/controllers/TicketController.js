const Order = require('../models/Order');
const Ticket = require('../models/Ticket');
const ticketController = {
    createTicket: async (req, res) => {
        let tickets = [];
        try {
            for (const ticket of req.body.tickets) {
                const createdTicket = await Ticket.create(ticket);
                tickets.push(createdTicket);
            }
            // res.status(201).json(tickets);
            const order = Order.create({
                user: "6485d5ca3382f2108705b59d",
                tickets: [tickets.map((ticket) => {
                    return { id: ticket.id }
                })],
                totalAmount: tickets.reduce((a, b) => a.price + b.price)
            })
            res.status(201), json({ order: order, tickets: tickets })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Failed to create ticket' });
        }
    },

    getTicket: async (req, res) => {
        try {
            const ticket = await Ticket.findById(req.params.id)
                .populate('event user')
                .exec();
            if (!ticket) {
                return res.status(404).json({ error: 'Ticket not found' });
            }
            res.json(ticket);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get ticket' });
        }
    },

    getAllTickets: async (req, res) => {
        try {
            const tickets = await Ticket.find()
                .populate('event user')
                .exec();
            res.json(tickets);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get tickets' });
        }
    },

    updateTicket: async (req, res) => {
        try {
            const ticket = await Ticket.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            )
                .populate('event user')
                .exec();
            if (!ticket) {
                return res.status(404).json({ error: 'Ticket not found' });
            }
            res.json(ticket);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update ticket' });
        }
    },

    deleteTicket: async (req, res) => {
        try {
            const ticket = await Ticket.findByIdAndDelete(req.params.id);
            if (!ticket) {
                return res.status(404).json({ error: 'Ticket not found' });
            }
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete ticket' });
        }
    },
};
module.exports = ticketController;
