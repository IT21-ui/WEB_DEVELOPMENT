import React, { useState } from 'react';
import { Bell, AlertCircle, CheckCircle, X, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

interface Notification {
  id: number;
  type: 'warning' | 'info' | 'success' | 'error';
  title: string;
  message: string;
  date: string;
  read: boolean;
  urgent: boolean;
}

const StudentNotifications: React.FC = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'warning',
      title: 'Low Attendance Alert',
      message: 'Your attendance in Physics has dropped to 72%. You need at least 75% to pass.',
      date: '2024-01-16',
      read: false,
      urgent: true
    },
    {
      id: 2,
      type: 'warning',
      title: 'GPA Below Threshold',
      message: 'Your current GPA in Mathematics is 2.8. Consider meeting with your teacher for additional support.',
      date: '2024-01-15',
      read: false,
      urgent: true
    },
    {
      id: 3,
      type: 'info',
      title: 'Assignment Due Soon',
      message: 'Chemistry lab report is due in 2 days. Don\'t forget to submit!',
      date: '2024-01-14',
      read: true,
      urgent: false
    },
    {
      id: 4,
      type: 'success',
      title: 'Excellent Performance',
      message: 'Congratulations! You achieved 95% in your History midterm exam.',
      date: '2024-01-13',
      read: true,
      urgent: false
    },
    {
      id: 5,
      type: 'info',
      title: 'Schedule Update',
      message: 'Your English class on Friday has been moved to Room 204.',
      date: '2024-01-12',
      read: false,
      urgent: false
    },
  ]);

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    toast({
      title: "All notifications marked as read",
      description: "Your notifications have been updated.",
    });
  };

  const dismissNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    toast({
      title: "Notification dismissed",
      description: "The notification has been removed.",
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning':
      case 'error':
        return <AlertCircle className="w-5 h-5 text-warning" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-success" />;
      default:
        return <Bell className="w-5 h-5 text-primary" />;
    }
  };

  const getNotificationBadge = (type: string) => {
    switch (type) {
      case 'warning':
        return <Badge className="bg-warning/10 text-warning hover:bg-warning/20">Warning</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      case 'success':
        return <Badge className="bg-success/10 text-success hover:bg-success/20">Success</Badge>;
      default:
        return <Badge variant="secondary">Info</Badge>;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const urgentCount = notifications.filter(n => n.urgent && !n.read).length;

  return (
    <div className="space-y-6">
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
              {unreadCount > 0 && (
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                  {unreadCount} unread
                </Badge>
              )}
              {urgentCount > 0 && (
                <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/20">
                  {urgentCount} urgent
                </Badge>
              )}
            </div>
            {unreadCount > 0 && (
              <Button onClick={markAllAsRead} variant="outline" size="sm">
                Mark All Read
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.length === 0 ? (
              <div className="text-center py-8">
                <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No notifications at this time</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border rounded-lg transition-colors ${
                    notification.read 
                      ? 'border-border/50 bg-background' 
                      : 'border-primary/20 bg-primary/5'
                  } ${notification.urgent && !notification.read ? 'border-destructive/50 bg-destructive/5' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <h4 className={`font-medium ${notification.read ? 'text-muted-foreground' : 'text-primary'}`}>
                            {notification.title}
                          </h4>
                          {getNotificationBadge(notification.type)}
                          {notification.urgent && !notification.read && (
                            <Badge variant="destructive" className="text-xs">
                              URGENT
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          {!notification.read && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => markAsRead(notification.id)}
                              className="h-8 w-8 p-0"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => dismissNotification(notification.id)}
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <p className={`text-sm ${notification.read ? 'text-muted-foreground' : 'text-foreground'}`}>
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">{notification.date}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions for At-Risk Students */}
      {urgentCount > 0 && (
        <Card className="dashboard-card border-destructive/50">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Action Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              You have urgent notifications that require immediate attention. Consider taking these actions:
            </p>
            <div className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                Schedule meeting with academic advisor
              </Button>
              <Button className="w-full justify-start" variant="outline">
                Contact teachers for extra help
              </Button>
              <Button className="w-full justify-start" variant="outline">
                Review study schedule and habits
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StudentNotifications;