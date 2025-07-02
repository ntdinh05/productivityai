Hi chúng bạn và các m, Nhật mới add thêm 1 thứ sẽ khá là quan trọng khi dev frontend về sau, file TaskContext.tsx trong app/(context). Data của tasks sẽ nằm ở trỏng, kèm theo một vài functions. TaskContext.tsx basically sẽ provide task context cho các components của app

để xài task context thì import nó vô file (ex. import {useTask} from '../(context)/TaskContext'), tạo một cái const {function với variables tụi m muốn xài sẽ nằm ở trong này} = useTask(). Xem những cái file như pomodoro.tsx, taskmodal.tsx, tasklist.tsx để hiểu hơn :v

Ráng nhé :)) trước mắt t đã code một vài function cho việc open cái Modal ở trong mytask. So, for example, các task ở trong my tasks giờ đã xuất hiện ở trong pomodoro page rồi, nếu tụi m ấn vô thì sẽ hiện ra lại modal ở trong my tasks.

Tuỳ ý tụi m modify cái file đó, miễn cái app nó work và đừng fuck up vì bug là được :))