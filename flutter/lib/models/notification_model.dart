class NotificationModel {
  final String notificationId;
  final String userId;
  final String interviewId;
  final String title;
  final String body;
  final bool read;
  NotificationModel({
    required this.interviewId,
    required this.notificationId,
    required this.userId,
    required this.title,
    required this.body,
    required this.read,
  });
}
