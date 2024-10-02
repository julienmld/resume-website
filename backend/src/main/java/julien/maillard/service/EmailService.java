package julien.maillard.service;

import julien.maillard.enumeration.Job;
import julien.maillard.model.Message;

public interface EmailService {

    public abstract void sendSimpleMessage(Message message);

    public abstract void registerVisitor(Job job);
}
