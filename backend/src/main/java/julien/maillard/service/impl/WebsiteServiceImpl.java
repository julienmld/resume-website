package julien.maillard.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import julien.maillard.entity.Visitor;
import julien.maillard.model.Message;
import julien.maillard.model.StatisticDTO;
import julien.maillard.repository.VisitorRepository;
import julien.maillard.service.WebsiteService;

@Service
public class WebsiteServiceImpl implements WebsiteService {

    private static final String JOB = "job";
    private static final String DEVELOPER = "developer";
    private static final String RECRUITER = "recruiter";
    private static final String STUDENT = "student";
    private static final String CLIENT = "client";
    private static final String CURIOUS = "curious";
    private static final String OTHER = "other";
    private static final String DEVICE = "device";
    private static final String COMPUTER = "computer";
    private static final String MOBILE = "mobile";

    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private VisitorRepository visitorRepository;

    public void sendSimpleMessage(Message message) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo("julienmld.pro@outlook.fr");
        mail.setSubject("Contact depuis site web");
        mail.setText(message.display());
        emailSender.send(mail);
    }

    public void registerVisitor(Visitor visitor) {
        visitor.setVisitDateTime(LocalDateTime.now().toString());
        visitorRepository.registerVisitor(visitor);
    }

    public StatisticDTO getStatisticDTO() {
        StatisticDTO statisticDTO = new StatisticDTO();

        List<List<Integer>> developers = getListOfList();
        List<List<Integer>> recruiters = getListOfList();
        List<List<Integer>> students = getListOfList();
        List<List<Integer>> clients = getListOfList();
        List<List<Integer>> curious = getListOfList();
        List<List<Integer>> others = getListOfList();

        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MONTH, -4);
        
        for (int i = 0; i < 5; i++) {
            int year = calendar.get(Calendar.YEAR);
            int month = calendar.get(Calendar.MONTH) + 1;
        
            developers.get(0).add(visitorRepository.countVisitorsByMonth(DEVICE, COMPUTER, JOB, DEVELOPER, month, year));
            developers.get(1).add(visitorRepository.countVisitorsByMonth(DEVICE, MOBILE, JOB, DEVELOPER, month, year));
        
            recruiters.get(0).add(visitorRepository.countVisitorsByMonth(DEVICE, COMPUTER, JOB, RECRUITER, month, year));
            recruiters.get(1).add(visitorRepository.countVisitorsByMonth(DEVICE, MOBILE, JOB, RECRUITER, month, year));

            students.get(0).add(visitorRepository.countVisitorsByMonth(DEVICE, COMPUTER, JOB, STUDENT, month, year));
            students.get(1).add(visitorRepository.countVisitorsByMonth(DEVICE, MOBILE, JOB, STUDENT, month, year));
        
            clients.get(0).add(visitorRepository.countVisitorsByMonth(DEVICE, COMPUTER, JOB, CLIENT, month, year));
            clients.get(1).add(visitorRepository.countVisitorsByMonth(DEVICE, MOBILE, JOB, CLIENT, month, year));

            curious.get(0).add(visitorRepository.countVisitorsByMonth(DEVICE, COMPUTER, JOB, CURIOUS, month, year));
            curious.get(1).add(visitorRepository.countVisitorsByMonth(DEVICE, MOBILE, JOB, CURIOUS, month, year));
        
            others.get(0).add(visitorRepository.countVisitorsByMonth(DEVICE, COMPUTER, JOB, OTHER, month, year));
            others.get(1).add(visitorRepository.countVisitorsByMonth(DEVICE, MOBILE, JOB, OTHER, month, year));
        
            calendar.add(Calendar.MONTH, 1);
        }

        statisticDTO.setDevelopers(developers);
        statisticDTO.setRecruiters(recruiters);
        statisticDTO.setStudents(students);
        statisticDTO.setClients(clients);
        statisticDTO.setCurious(curious);
        statisticDTO.setOthers(others);

        return statisticDTO;
    }

    private List<List<Integer>> getListOfList() {
        List<List<Integer>> listOfList = new ArrayList<>();
        List<Integer> computerList = new ArrayList<>();
        List<Integer> mobileList = new ArrayList<>();
        listOfList.add(computerList);
        listOfList.add(mobileList);
        return listOfList;
    }

}