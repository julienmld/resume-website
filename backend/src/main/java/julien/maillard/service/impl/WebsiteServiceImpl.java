package julien.maillard.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

import julien.maillard.entity.Visitor;
import julien.maillard.model.Message;
import julien.maillard.model.StatisticDTO;
import julien.maillard.repository.VisitorRepository;
import julien.maillard.service.WebsiteService;

@Service
public class WebsiteServiceImpl implements WebsiteService {

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

    public void registerVisitor(Visitor visitor) {
        visitor.setVisitDateTime(LocalDateTime.now().toString());
        visitorRepository.registerVisitor(visitor);
    }

    public StatisticDTO getStatisticDTO() {
        StatisticDTO statisticDTO = new StatisticDTO();
        statisticDTO.setNumberDeveloper(visitorRepository.countVisitorsByAttribute("job", "developer"));
        statisticDTO.setNumberRecruiter(visitorRepository.countVisitorsByAttribute("job", "recruiter"));
        statisticDTO.setNumberStudent(visitorRepository.countVisitorsByAttribute("job", "student"));
        statisticDTO.setNumberClient(visitorRepository.countVisitorsByAttribute("job", "client"));
        statisticDTO.setNumberCurious(visitorRepository.countVisitorsByAttribute("job", "curious"));
        statisticDTO.setNumberOther(visitorRepository.countVisitorsByAttribute("job", "other"));

        Calendar calendar = Calendar.getInstance();
        Map <Integer, int[]> deviceStatistics = new HashMap<>();
        for (int i = 0; i < 5; i++) {
            int year = calendar.get(Calendar.YEAR);
            int month = calendar.get(Calendar.MONTH) + 1;
            deviceStatistics.put(month, new int[] {visitorRepository.countVisitorsByMonth("device", "computer", month, year), visitorRepository.countVisitorsByMonth("device", "mobile", month, year)});
            calendar.add(Calendar.MONTH, -1);
        }
        statisticDTO.setDeviceStatistics(deviceStatistics);
        return statisticDTO;
    }

}