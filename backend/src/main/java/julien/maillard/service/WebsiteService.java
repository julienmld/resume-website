package julien.maillard.service;

import julien.maillard.model.Message;
import julien.maillard.model.StatisticDTO;
import julien.maillard.entity.Visitor;

public interface WebsiteService {

    void sendSimpleMessage(Message message);

    void registerVisitor(Visitor visitor);

    StatisticDTO getStatisticDTO();

}
