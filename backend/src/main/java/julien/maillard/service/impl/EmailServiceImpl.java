package julien.maillard.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

import julien.maillard.entity.Visitor;
import julien.maillard.enumeration.Job;
import julien.maillard.model.Message;
import julien.maillard.repository.VisitorRepository;
import julien.maillard.service.EmailService;

@Service
public class EmailServiceImpl implements EmailService {

    private static final String mailSubject = "Contact depuis site web";
    private static final String myMail = "julienmld.pro@outlook.fr";

    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private VisitorRepository visitorRepository;

    public void sendSimpleMessage(Message message) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(myMail);
        mail.setSubject(mailSubject);
        mail.setText(message.display());
        emailSender.send(mail);
    }

    public void registerVisitor(Job job) {
        Visitor visitor = new Visitor();
        visitor.setJob(job.toString());
        visitor.setDate(LocalDateTime.now().toString());
        visitorRepository.registerVisitor(visitor);
    }

}