package julien.maillard.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.LinkedHashMap;
import java.util.Map;

import julien.maillard.entity.Visitor;
import julien.maillard.model.Message;
import julien.maillard.model.StatisticDTO;
import julien.maillard.repository.VisitorRepository;
import julien.maillard.service.WebsiteService;

@Service
public class WebsiteServiceImpl implements WebsiteService {

    private static final String JOB = "job";
    private static final String DEVICE = "device";

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
        statisticDTO.setNumberDeveloper(visitorRepository.countVisitorsByAttribute(JOB, "developer"));
        statisticDTO.setNumberRecruiter(visitorRepository.countVisitorsByAttribute(JOB, "recruiter"));
        statisticDTO.setNumberStudent(visitorRepository.countVisitorsByAttribute(JOB, "student"));
        statisticDTO.setNumberClient(visitorRepository.countVisitorsByAttribute(JOB, "client"));
        statisticDTO.setNumberCurious(visitorRepository.countVisitorsByAttribute(JOB, "curious"));
        statisticDTO.setNumberOther(visitorRepository.countVisitorsByAttribute(JOB, "other"));
        Calendar calendar = Calendar.getInstance();
        Map<Integer, int[]> deviceStatistics = new LinkedHashMap<>();
        calendar.add(Calendar.MONTH, -4);
        for (int i = 0; i < 5; i++) {
            int year = calendar.get(Calendar.YEAR);
            int month = calendar.get(Calendar.MONTH) + 1;
            deviceStatistics.put(month,
                    new int[] { visitorRepository.countVisitorsByMonth(DEVICE, "computer", month, year),
                                visitorRepository.countVisitorsByMonth(DEVICE, "mobile", month, year) });
            calendar.add(Calendar.MONTH, 1);
        }
        statisticDTO.setDeviceStatistics(deviceStatistics);
        return statisticDTO;
    }

}