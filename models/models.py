from sqlalchemy import Column, String, Integer, BigInteger, ForeignKey, Date, BIGINT
import json

from sqlalchemy.orm import relationship

from config import db


class User(db.Model):
    id = Column(String(25), primary_key=True)
    email = Column(String(50), nullable=True)

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def short(self):
        return {"id": self.id, "entries": [e.short() for e in self.entries]}

    def __repr__(self):
        return json.dumps(self.short())


class Entry(db.Model):
    id = Column(Integer().with_variant(Integer, "sqlite"), primary_key=True)
    date = Column(Date, nullable=False)
    mood = Column(String(10), nullable=False)
    goals = Column(String(150))
    thanks = Column(String(150))
    tries = Column(String(150))
    thoughts = Column(String(250))
    user = relationship("User", backref="entries", lazy=True)
    user_id = Column(String(25), ForeignKey("user.id"))

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def short(self):
        return {"date": self.date.strftime("%a, %d %b %Y"), "mood": self.mood, "goals": self.goals,
                "tries": self.tries, "thanks": self.thanks, "thoughts":self.thoughts}

    def __repr__(self):
        return json.dumps(self.short())
